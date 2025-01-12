
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request, jsonify
from flask_cors import CORS
import sleep
from datetime import date
import cohere


ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
client = MongoClient(env.get('MONGO_URL'), server_api=ServerApi('1'))
database = client['user']
collection = database['metadata']
promptEngineer = env.get("promptEngineer")
COHERE_API_KEY = env.get("COHERE_API_KEY")
if COHERE_API_KEY is None:
    raise ValueError("COHERE_API_KEY environment variable not found")
co = cohere.Client(COHERE_API_KEY)

oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)

@app.route("/register-user", methods=["POST"])
def register_user():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400
        if "email" not in data:
            return jsonify({"error": f"Missing required field: email"}), 400

        email = data['email']
        if not email:
            return jsonify({"error": "Missing or empty required field: email"}), 400

        results = collection.find_one(
            {'email' : email}
        )

        # email not found in db
        if not results:
            data['character_exists'] = True
            collection.insert_one(data)

            return jsonify(
                {
                    "message": "Email registered successfully",
                    "character_exists": False
                }
            ), 201

        # email exists but no associated character
        if results and results.get('character_exists', False):
            return jsonify(
                {
                    "message": "Email found, but no associated character",
                    "character_exists": False
                }
            ), 200

        return jsonify(
            {
                "message": "Character exists with email",
                "character_exists": True
            }
        ), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update-sleep', methods=['POST'])
def update_sleep():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400
        if "email" not in data:
            return jsonify({"error": f"Missing required field: email"}), 400

        email = data['email']
        hours = int(data['hours'])
        document = collection.find_one(
            {'email' : email}
        )

        if 'sleep' in document:
            last_time = document['sleep']['last_time']
            prev_hours = int(document['sleep']['hours'])
            
            if not sleep.is_different_day(last_time):
                hours += prev_hours

        sleep.update(document, collection, hours)
        master_value = generate_chat_response(document['sleep'])
        sleep.update(document, collection, master_value)

        return jsonify({"message": "Updated sleep"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update-nutrition', methods=['POST'])
def update_nutrition():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400
    if "email" not in data:
        return jsonify({"error": f"Missing required field: email"}), 400

    email = data['email']

    results = collection.find_one(
        {'email' : email}
    )

@app.route('/update-activity', methods=['POST'])
def update_activity():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400
    if "email" not in data:
        return jsonify({"error": f"Missing required field: email"}), 400

    email = data['email']

    results = collection.find_one(
        {'email' : email}
    )

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )

@app.route("/api/mepet", methods=["POST"])
def mepet():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    if "email" not in data:
        return jsonify({"error": f"Missing required field: email"}), 400
    
    email = data['email']


    record = collection.find_one({'email' : email})
    if not record:
        return jsonify({"mepet": ""}), 201
    return jsonify({"mepet": record["name"]}), 200

@app.route("/api/activity", methods=["POST"])
def activity():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    else:
        return jsonify({"activity": "running"}), 200

@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

if __name__ == '__main__':
    CORS(app)
    app.run(port=env.get("PORT", 5000))

def generate_chat_response(data):
    combined = f"{promptEngineer}\n\n{data}"

    try:
        response = co.generate(
            model='command-xlarge',
            prompt=combined,
            max_tokens=50,
            temperature=0.3,
            k=0,
            p=0.9,
            frequency_penalty=0.1,
            presence_penalty=0.1,
            stop_sequences=["}"]
        )

        response = response.generations[0].text.strip()
        return response[:response.find('}') + 1]
    except Exception as e:
        print(f"Error details: {e}")
        return f"Error generating response: {e}"
    
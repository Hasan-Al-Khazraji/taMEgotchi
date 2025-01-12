
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from pymongo import MongoClient

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request
from flask_cors import CORS

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")

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
            data['character_exists'] = False
            collection.insert_one(data)

            return jsonify({
                "message": "Email registered successfully",
                "character_exists": False
            }), 201

        # email exists but no associated character
        if results and results.get('character_exists', False):
            return jsonify({
                "message": "Email found, but no associated character",
                "character_exists": False
            }), 200

        return jsonify({
            "message": "Character exists with email",
            "character_exists": True
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route()
# def update_statistics():
#     try:
#         data = request.json

#         if not data:
#             return jsonify({"error": "No data provided"}), 400

#         required_fields = ["hunger", "activity", "productivity"]
#         if not all(field in data for field in required_fields):
#             return jsonify({"error": f"Missing required fields: {required_fields}"}), 400

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

@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))


if __name__ == '__main__':
    app.run(port=env.get("PORT", 5000))

    CORS(app)
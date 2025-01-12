import cohere
from os import environ as env
import json
from dotenv import find_dotenv, load_dotenv

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

promptEngineer = """
    You are a chatbot designed to calculate a Master Value for a given category (FOOD, ACTIVITY, or SLEEP). You will receive a JSON object containing a list of key-value pairs, where the key represents an item (e.g., meal type, activity type, sleep session) and the value is its associated score (healthiness, hours spent, hours slept).

    Your task is to:
    1. Penalize unhealthy food items, sedentary activities, and insufficient sleep more heavily. Focus only on the provided category (e.g., if the input is FOOD, only calculate the Master Value for FOOD).
    2. Apply the following scaling factors:
    - High-calorie or fried foods: multiply by 0.5
    - Healthy foods (e.g., vegetables, lean meats): multiply by 1.2
    - Sedentary activities (e.g., watching TV): multiply by 0.7
    - Productive activities (e.g., running, cycling, homework): multiply by 1.3
    - Short sleep durations (< 6 hours): multiply by 0.6
    - Optimal sleep durations (7-9 hours): multiply by 1.1

    After applying the scaling factors:
    1. Calculate the Master Value using a weighted average.
    2. Return a single Master Value on a 100-point scale, favoring healthy habits.

    Return the result in the following format:
    {
        "*replace with category*": MasterValue
    }
    """

COHERE_API_KEY = env.get("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

def generate_chat_response(field, collection):
    data = list(collection.find({}, {field: 1, '_id': 0}))
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
        print(response[:response.find('}') + 1])
        parsed_response = response[:response.find('}') + 1]
        return json.loads(parsed_response)
    except Exception as e:
        print(f"Error details: {e}")
        return f"Error generating response: {e}"
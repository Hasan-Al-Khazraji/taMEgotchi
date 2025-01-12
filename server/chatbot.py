import cohere
from os import environ as env
from dotenv import find_dotenv, load_dotenv
import json

# Load environment variables from .env file
load_dotenv(find_dotenv())
COHERE_API_KEY = env.get("COHERE_API_KEY")

if COHERE_API_KEY is None:
    raise ValueError("COHERE_API_KEY environment variable not found")

# Initialize the Cohere client with your API key
co = cohere.Client(COHERE_API_KEY)

# Define a function to generate chat responses
def generate_chat_response(prompt):
    try:
        response = co.generate(
            model='command-xlarge',
            prompt=prompt,
            max_tokens=50,
            temperature=0.3,
            k=0,
            p=0.9,
            frequency_penalty=0.1,
            presence_penalty=0.1,
            stop_sequences=["}"]
        )

        return response.generations[0].text.strip()
    except Exception as e:
        print(f"Error details: {e}")
        return f"Error generating response: {e}"

# Example usage
if __name__ == "__main__":
    data = [
        {'gym': 1.5, "homework": 2.0, "tv": 1.0},
    ]
    data_json = json.dumps(data)

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
    json
    {
    "*replace with category*": MasterValue
    }
    """

    
    combined = f"{promptEngineer}\n\n{data_json}"
    response = generate_chat_response(combined)

    trimmed_response = response[:response.find('}') + 1]
    print(trimmed_response)

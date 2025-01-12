from pymongo.mongo_client import MongoClient
from datetime import datetime

def update(document, collection, hours):
    sleep_field = {
        'hours' : hours,
        'is_valid' : is_valid(hours),
        'last_time' : datetime.now()
    }

    updated_document = collection.update_one(
        document,
        {
            '$set' : {
                'sleep' : sleep_field
            }
        },
        upsert=True
    )

    return updated_document

def is_valid(hours):
    return hours >= 8

def is_different_day(last_time):
    return datetime.now().date() != last_time
from pymongo.mongo_client import MongoClient
from datetime import date

def update(document, collection, hours):
    sleep_field = {
        'hours' : hours,
        'is_valid' : is_valid(hours),
        'last_time' : date.today()
    }

    updated_document = collection.update_one(
        document,
        {
            '$set' : {
                'sleep' : sleep_field
            }
        }
    )

    return updated_document

def initialize(document, collection):
    return update(document, collection, 0)

def is_valid(hours):
    return hours >= 8

def is_different_day(last_time):
    return date.today() != last_time
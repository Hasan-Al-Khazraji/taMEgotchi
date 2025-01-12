from datetime import datetime

def is_different_day(last_time):
    return datetime.now().date() != last_time

def update(document, collection, key, value):
    updated_document = collection.update_one(
        document,
        {
            '$set' : {
                key : value
            }
        },
        upsert=True
    )

    return updated_document
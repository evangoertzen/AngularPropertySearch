import json
import os
import time
from homeharvest import scrape_property
import numpy as np
import pandas as pd
import requests
import random

# allFields = ['property_url', 'property_id', 'listing_id', 'mls', 'mls_id', 'status', 'text', 
#              'style', 'full_street_line', 'street', 'unit', 'city', 'state', 'zip_code', 'beds',
#              'full_baths', 'half_baths', 'sqft', 'year_built', 'days_on_mls', 'list_price',
#              'list_price_min', 'list_price_max', 'list_date', 'sold_price', 'last_sold_date',
#              'assessed_value', 'estimated_value', 'tax', 'tax_history', 'new_construction',
#              'lot_sqft', 'price_per_sqft', 'latitude', 'longitude', 'neighborhoods',
#              'county', 'fips_code', 'stories', 'hoa_fee', 'parking_garage', 'agent_id',
#              'agent_name', 'agent_email', 'agent_phones', 'agent_mls_set',
#              'agent_nrds_id', 'broker_id', 'broker_name', 'builder_id', 'builder_name',
#              'office_id', 'office_mls_set', 'office_name', 'office_email', 'office_phones', 
#              'nearby_schools', 'primary_photo', 'alt_photos']

importantFields = ['property_url', 'property_id', 'listing_id', 'mls', 'mls_id', 'status', 'text', 
             'style', 'full_street_line', 'street', 'unit', 'city', 'state', 'zip_code', 'beds',
             'full_baths', 'half_baths', 'sqft', 'year_built', 'days_on_mls', 'list_price',
             'list_date', 'assessed_value', 'estimated_value', 'tax', 'tax_history', 'lot_sqft',
             'price_per_sqft', 'latitude', 'longitude', 'county', 'hoa_fee', 'nearby_schools',
             'primary_photo']

COUNTER_FILE = "counter.json"

# Load the counter from file
def load_counter():
    if not os.path.exists(COUNTER_FILE):
        return {"count": 0, "last_reset": time.time()}
    
    with open(COUNTER_FILE, "r") as f:
        return json.load(f)

# Save counter to file
def save_counter(data):
    with open(COUNTER_FILE, "w") as f:
        json.dump(data, f)

# Increment the counter, reset if 30 days have passed, and return the new count
def increment_request_counter():
    data = load_counter()
    current_time = time.time()
    days_since_reset = (current_time - data["last_reset"]) / (60 * 60 * 24)  # Convert seconds to days

    if days_since_reset >= 31:
        data["count"] = 0  # Reset counter if 31 days have passed
        data["last_reset"] = current_time  # Update last reset timestamp

    data["count"] += 1
    save_counter(data)

    return data["count"]

# Get counter as raw value
def get_counter():
    data = load_counter()
    return data["count"]

def filter_df(properties, minPrice, maxPrice, minBeds, minBaths, status):
    return properties[(properties['list_price'] <= maxPrice) & (properties['list_price'] >= minPrice) & (properties['status']==status) & (properties['beds']>=minBeds) & (properties['full_baths'] + properties['half_baths'] >= minBaths)]

def propSearch(location: str, limit: int, minPrice: int, maxPrice: int, minBeds: int, minBaths: int, listingType: str):

    storage_dir = "PropertyData/"
    file_path = storage_dir + location +".json"

    # create PropertyData dir if it doesn't exist
    if not os.path.exists(storage_dir):
        os.makedirs(storage_dir)

    four_hours_ago = time.time() - (4 * 3600)
    
    # delete all files over 4 hours old
    for filename in os.listdir(storage_dir):
        file_path = os.path.join(storage_dir, filename)

        if os.path.isfile(file_path):

            # Add your condition here, for example:
            if os.path.getmtime(file_path) < four_hours_ago:  # Condition to check for .txt files
                try:
                    os.remove(file_path)  # Remove the file
                    print(f"Removed: {file_path}")
                except Exception as e:
                    print(f"Error removing {file_path}: {e}")


    #If file was saved in the last 4 hours, load it. Otherwise
    if os.path.exists(file_path) and os.path.getmtime(file_path) > four_hours_ago:
        
        with open(file_path, "r") as file:
            properties = pd.read_json(file_path, orient="records")
            properties = filter_df(properties, minPrice, maxPrice, minBeds, minBaths, listingType)
            return properties.to_dict(orient="records")
        return {}
    
    else:

        properties = scrape_property(
            location=location,
            # listing_type=listingType,  # for_sale, for_rent, pending
            extra_property_data=True,
            # property_type=['single_family','multi_family'],
            # date_from="2023-05-01", # alternative to past_days
            # date_to="2023-05-28",
            # foreclosure=True
            # mls_only=True,  # only fetch MLS listings
            limit=500
        )

        properties = properties.head(limit)

        # filter out unnecessary fields 
        properties = properties[importantFields]

        # filter out properties with no longitude or latitude
        properties = properties.dropna(subset=['longitude', 'latitude'])

        # get values instead of dictionaries
        properties = properties.map(lambda x: x['0'] if isinstance(x, dict) else x)
        
        # replace inf/nan values before converting to json
        properties.replace([np.inf, -np.inf], np.nan, inplace=True)
        properties.fillna(0, inplace=True)

        # save json file
        properties.to_json(file_path, orient="records", indent=4)
    
        properties = filter_df(properties, minPrice, maxPrice, minBeds, minBaths, listingType)

        return properties.to_dict(orient="records")


def calcRent(address: str, apiKey: str, propertyType: str, bedrooms: str, bathrooms: str, squareFootage: str):

    return random.randint(1000, 5000)
    url = "https://api.rentcast.io/v1/avm/rent/long-term"

    params = {
        "address": address,
        "propertyType": propertyType,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "squareFootage": squareFootage,
    }

    headers = {
        "accept": "application/json",
        "X-Api-Key": apiKey
    }
    
    print("Calculating rent for address: " + address)
    print("API Key: " + apiKey)

    # only make request if under free request limit. Otherwise return -1
    if(get_counter() < 50):
        response = requests.get(url, params=params, headers=headers)
    else:
        raise ValueError("You've used too many requests this month")


    if response.status_code == 200:

        increment_request_counter()
        data = response.json()
        rent = data.get("rent")
        print(f"Estimated Rent: ${rent}")
        return rent
    
    else:
        print(f"Error: {response.status_code}, {response.text}")

    time.sleep(1)
    # return random.randint(1000, 5000)
    return -1
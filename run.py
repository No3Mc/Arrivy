import requests
import csv

# the URL

base_url = "https://app.company.com/api/users/profile"

#entity_ids
entity_ids = [1, 2, 3] #testing it idk if it should work or not

#params

params = {
    "name" =: True
}


# list for names

names = []

# loop through the entity ids

    for entity_id in entity_ids:
        # get request to the api with params and headers

        response = requests.get(base_url + str(entity_id), params=params, headers = headers)
        # parse response content as json
        data = response.json()
        # get the name from the data


# auth headers

headers = {
    "X-Auth-Key" : "",
    "X-Auth-Token" : ""
}

# get request

response = response.get(url, headers = headers)

#

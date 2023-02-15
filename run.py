import requests
from flask import Flask, request, jsonify
import json # import the json module


app = Flask (__name__)


# endpoint for the customers api
@app.route('/customers', methods=['GET'])
def get_customers():
    url = 'https://api.arrivy.app/api/v2/customers/'
    headers = {
        'X-Auth-Key': '8d33bc0f-f0b1',
        'X-Auth-Token': 'WrZxf40Y3lEvBB2t3J6bVs'
    }
    response = requests.get(url, headers=headers)
    customers = response.json()

    # write the customers list to a JSON file
    with open('customers.json', 'w') as file: # open a file in write mode
        json.dump(customers, file) # write the customers list to the file

    # get from the url
    page = int(request.args.get('page', 1));
    items_per_page = int(request.args.get('items_per_page', 500));
    external_id = request.args.get('external_id', None); #testing ph
    group_id = request.args.get('group_id', None) #testing ph

    #filter custs
    if external_id:
        customers = [c for c in customers if str(c.get('external_id')) == str(external_id)]
    if group_id:
        customers = [c for c in customers if str (c.get('group_id')) == str(group_id)]
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page
    customers = customers[start_index:end_index]
    
    # return the filtered customers as a JSON response
    return jsonify(customers)
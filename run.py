import requests
from flask import Flask, request
from flask_csv import send_csv

app = Flask(__name__)

# endpoint for the customers API
@app.route('/customers', methods=['GET'])
def get_customers():
    url = 'https://api.arrivy.app/api/v2/customers/'
    headers = {
        'X-Auth-Key': '8d33bc0f-f0b1',
        'X-Auth-Token': 'WrZxf40Y3lEvBB2t3J6bVs'
    }
    response = requests.get(url, headers=headers)
    customers = response.json()

    # retrieve query parameters
    page = int(request.args.get('page', 1))
    items_per_page = int(request.args.get('items_per_page', 500))
    external_id = request.args.get('external_id', None)
    group_id = request.args.get('group_id', None)

    # filter customers if necessary
    if external_id:
        customers = [c for c in customers if str(c.get('external_id')) == str(external_id)]
    if group_id:
        customers = [c for c in customers if str(c.get('group_id')) == str(group_id)]

    # slice the customers list based on pagination parameters
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page
    customers = customers[start_index:end_index]

    # send the customers list as a CSV file
    fieldnames = customers[0].keys() if customers else []
    return send_csv(customers, "customers.csv", fieldnames=fieldnames)

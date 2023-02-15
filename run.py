import requests
import csv
import os
api_key = os.environ.get('8d33bc0f-f0b1')
api_token = os.environ.get('WrZxf40Y3lEvBB2t3J6bVs')
headers = {
    'X-Auth-Key': "8d33bc0f-f0b1",
    'X-Auth-Token': "WrZxf40Y3lEvBB2t3J6bVs"
}
base_url = 'https://app.arrivy.com/api'
customer_data = []
response = requests.get(base_url + '/customers', headers=headers)
if response.status_code == 200:
    customers = response.json()
    for customer in customers:
        customer_id = customer.get('id')
        response = requests.get(base_url + f'/customers/{customer_id}', headers=headers)
        if response.status_code == 200:
            customer_details = response.json()
            fname = customer_details.get('first_name')
            lname = customer_details.get('last_name')
            email = customer_details.get('email')
            phone = customer_details.get('mobile_number')
            city = customer_details.get('city')
            state = customer_details.get('state')
            country = customer_details.get('country')
            fields = customer_details.get('extra_fields')
            
            
            customer_dict = {
                'first_name': fname,
                'last_name': lname,
                'email': email,
                'mobile_number': phone,
                'city': city,
                'state': state,
                'country': country,
                'extra_fields': fields
                
                
                
            }
            customer_data.append(customer_dict)
        else:
            print(f'Error getting customer details for {customer_id}: {response.status_code}')
else:
    print(f'Error getting customer list: {response.status_code}')
with open('customer_data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['First Name','Last Name', 'Email', 'Mobile No', 'City', 'State', 'Country', 'Extra Fields'])
    for customer in customer_data:
        writer.writerow([customer['first_name'], customer['last_name'], customer['email'], customer['mobile_number'], customer['city'], customer['state'], customer['country'], customer['extra_fields']])
const request = require('request');
const fs = require('fs');
const { Parser } = require('json2csv');
require('dotenv').config();

const api_key = process.env.API_KEY;
const api_token = process.env.API_TOKEN;
const headers = {
  'X-Auth-Key': api_key,
  'X-Auth-Token': api_token
};
const base_url = 'https://app.arrivy.com/api';
const customer_data = [];

request.get(base_url + '/customers', { headers }, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const customers = JSON.parse(body);
    customers.forEach(customer => {
      const customer_id = customer.id;
      request.get(base_url + `/customers/${customer_id}`, { headers }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const customer_details = JSON.parse(body);
          const name = customer_details.name;
          const email = customer_details.email;
          const phone = customer_details.phone;
          const address = customer_details.address;
          const customer_dict = {
            'name': name,
            'email': email,
            'phone': phone,
            'address': address
          };
          customer_data.push(customer_dict);
        } else {
          console.log(`Error getting customer details for ${customer_id}: ${response.statusCode}`);
        }
      });
    });
  } else {
    console.log(`Error getting customer list: ${response.statusCode}`);
  }
}).on('complete', () => {
  const fields = ['name', 'email', 'phone', 'address'];
  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(customer_data);
  fs.writeFileSync('customer_data.csv', csv);
});

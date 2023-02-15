const axios = require('axios');
const json2csv = require('json2csv').parse;
const fs = require('fs');

const api_key = '8d33bc0f-f0b1';
const api_token = 'WrZxf40Y3lEvBB2t3J6bVs';

const headers = {
    'X-Auth-Key': api_key,
    'X-Auth-Token': api_token
};

const base_url = 'https://app.arrivy.com/api';

const getCustomerDetails = async (customer) => {
  const response = await axios.get(`${base_url}/customers/${customer.id}`, { headers });
  if (response.status === 200) {
    const { id, first_name, last_name, email, mobile_number, city, state, country, extra_fields } = response.data;
    return { id, first_name, last_name, email, mobile_number, city, state, country, extra_fields };
  } else {
    console.error(`Error getting customer details for ${customer.id}: ${response.status}`);
    return null;
  }
}

const getCustomers = async () => {
  const response = await axios.get(`${base_url}/customers`, { headers });
  if (response.status === 200) {
    return response.data;
  } else {
    console.error(`Error getting customer list: ${response.status}`);
    return null;
  }
}

const main = async () => {
  const customers = await getCustomers();
  const customerData = [];
  for (const customer of customers) {
    const customerDetails = await getCustomerDetails(customer);
    if (customerDetails !== null) {
      customerData.push(customerDetails);
    }
  }
  const csvData = json2csv(customerData);
  fs.writeFile('customer_data.csv', csvData, (error) => {
    if (error) {
      console.error(`Error writing CSV file: ${error}`);
    } else {
      console.log('CSV file written successfully');
    }
  });
}

main();

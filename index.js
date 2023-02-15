// Import the modules
const request = require('request');
const csvWriter = require('csv-writer');

// Get the environment variables
const api_key = process.env['8d33bc0f-f0b1'];
const api_token = process.env['WrZxf40Y3lEvBB2t3J6bVs'];

const headers = {
  'X-Auth-Key': "8d33bc0f-f0b1",
  'X-Auth-Token': "WrZxf40Y3lEvBB2t3J6bVs"
};

const base_url = 'https://app.arrivy.com/api';

const customer_data = [];

const getCustomerDetails = (customer_id) => {
  return new Promise((resolve, reject) => {
    request.get(base_url + `/customers/${customer_id}`, {headers: headers}, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode === 200) {
        const customer_details = JSON.parse(body);
        const name = customer_details.name;
        const email = customer_details.email;
        const phone = customer_details.phone;
        const address = customer_details.address;
        const customer_dict = {
          name: name,
          email: email,
          phone: phone,
          address: address
        };
        resolve(customer_dict);
      } else {
        reject(`Error getting customer details for ${customer_id}: ${response.statusCode}`);
      }
    });
  });
};

const writeCustomerData = (customer_data) => {
  return new Promise((resolve, reject) => {
    const writer = csvWriter.createObjectCsvWriter({
      path: 'customer_data.csv',
      header: [
        {id: 'name', title: 'name'},
        {id: 'email', title: 'email'},
        {id: 'phone', title: 'phone'},
        {id: 'address', title: 'address'}
      ]
    });
    writer.writeRecords(customer_data)
      .then(() => {
        resolve('The CSV file was written successfully');
      })
      .catch((error) => {
        reject(error);
      });
  });
};
request.get(base_url + '/customers', {headers: headers}, (error, response, body) => {
    if (error) {
      console.error(error);
  } else if (response.statusCode === 200) {
      const customers = JSON.parse(body);
      const promises = [];
      for (const customer of customers) {
        const customer_id = customer.id;
        promises.push(getCustomerDetails(customer_id));
      }
      Promise.all(promises)
        .then((results) => {
          for (const result of results) {
            customer_data.push(result);
          }
          return writeCustomerData(customer_data);
        })
        .then((message) => {
          console.log(message);
        })
        .catch((error) => {
            console.error(error);
          });
    }
});
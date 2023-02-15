<<<<<<< HEAD
const axios = require('axios');

const authToken = 'WrZxf40Y3lEvBB2t3J6bVs';
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': 'application/json'
};
const url = 'https://app.arrivy.com/api/';

axios.get(url, { headers })
  .then(response => {
    if (response.status === 200) {
      const customerData = response.data;
      // fs.writeFile('customers.json', JSON.stringify(customerData), err => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log('Customer data saved to customers.json');
      //   }
      // });
    } else {
      console.error(`Error retrieving customer data: ${response.status}`);
    }
  })
  .catch(error => {
=======
var request = require('request');
var fs = require('fs');
var csvWriter = require('csv-writer');
var apiKey = '8d33bc0f-f0b1';
var authToken = 'WrZxf40Y3lEvBB2t3J6bVs';
var apiUrl = 'https://app.arrivy.com/api/customers';
var csvFile = 'customers.csv';
request.get({
  url: apiUrl,
  headers: {
    'X-ARRIVY-API-KEY': apiKey,
    'X-ARRIVY-AUTH-TOKEN': authToken // Add the auth token header
  }
}, function (error, response, body) {
  if (error) {
>>>>>>> e5b705e4aa42f629ba028ac8b4575bdeeca77526
    console.error(error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error('Status code: ' + response.statusCode);
    return;
  }
  var data = JSON.parse(body);
  var customers = data.map(function (customer) {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    };
  });
  var csvWriter = csvWriter.createArrayCsvWriter({
    path: csvFile,
    header: ['Name', 'Email', 'Phone']
  });
  csvWriter.writeRecords(customers)
    .then(function () {
      console.log('Customer data written to ' + csvFile);
    })
    .catch(function (error) {
      console.error(error);
    });
});
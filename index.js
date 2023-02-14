const axios = require('axios');
const fs = require('fs');

const authToken = 'WrZxf40Y3lEvBB2t3J6bVs';
const headers = {
  'Authorization': `Bearer ${authToken}`,
  'Content-Type': 'application/json'
};
const url = 'https://api.arrivy.com/api/v2/customers/';

axios.get(url, { headers })
  .then(response => {
    if (response.status === 200) {
      const customerData = response.data;
      fs.writeFile('customers.json', JSON.stringify(customerData), err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Customer data saved to customers.json');
        }
      });
    } else {
      console.error(`Error retrieving customer data: ${response.status}`);
    }
  })
  .catch(error => {
    console.error(error);
  });

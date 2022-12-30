const { createQuery } = require('./query-builder');
const database = require('./database');
const soap = require('soap');
const request = require('request');

const url = 'http://localhost:8080/wsdl?wsdl';



const getData = (request, callback) => {
  soap.createClient(url, (err, client) => {
    if (err) {
      // If there's an error, send a 500 Internal Server Error response
      res.status(500).send(err);
      return;
    }

    // Parse the request data
    const requestData = request.body;
    const query = createQuery(requestData);
    


    // Execute the query and get the result
    database.query(query, (error, result) => {
      if (error) {
        return callback(error);
      }

      // Create the request payload
      const payload = {
        result: result
      };

      // Call the SOAP method and get the response
      client.GetRecordById(payload, (error, record) => {
        if (error) {
          return callback(error);
        }

        // Return the response to the main project using the callback
        callback({ record });
      });
    });
  });
};

module.exports = { getData };
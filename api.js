const express = require('express');
const bodyParser = require('body-parser');
const { createQuery } = require('./query-builder');
const database = require('./database');
const soap = require('soap');
const grpc = require('grpc');
const { response } = require('express');
const kisi = grpc.load('isim.proto').isim;
//const request = require('request');

const app = express();

const url = require('fs').readFileSync('api.wsdl', 'utf8');
app.use(bodyParser.json());



app.post('/api', (req, res) => {
  
  soap.createClient(url, (err, client) => {
    if (err) {
      console.log(err);
      
      res.status(500).send(err);
      return;
    }

    
    const requestData = req.body;
    const query = createQuery(requestData);
    


    
    database.query(query, (error, result) => {
      if (error) {
        
        return res.send(error);
      }

      
      const payload = {
        result: result
      };

      
      client.GetRecordById(payload, (error, record) => {
        if (error) {
          return callback(error);
        }

        
        res.send(record);
      });
    });
  });



});
const server = new grpc.Server();
app.post('/isim', (req, res) => {
  
  
server.addService(isim.Isim.service, {
  Tamİsim: (req, callback) => {
    const tamAd = `${req.isim} ${req.soyisim}`;
    callback(null, { tam_ad: tamAd });
  },
});


});

app.listen(8080, () => {
  console.log('API listening on port 8080');
});
server.bind('localhost:8080', grpc.ServerCredentials.createInsecure());
server.start();

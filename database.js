const sql = require('mysql');
//const sql = require('mssql');

/*const config = {
  user: 'Rojo',
  password: '',
  server: 'DESKTOP-6CF2A79',
  database: 'Kisiler',
  options: {
    encrypt: true
  }
};

const connect = () => {
  return new Promise((resolve, reject) => {
    sql.connect(config, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const query = (sqlQuery, callback) => {
  connect()
    .then(() => {
      const request = new sql.Request();
      request.query(sqlQuery, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });
    })
    .catch(err => {
      callback(err);
    });
};*/


const config = {
  host: 'localhost',
  user: 'root',
  password: '123Qweasdzxc.',
  database: 'otelotomasyon'
};

const connect = () => {
  return new Promise((resolve, reject) => {
    mysql.createConnection(config, (err, connection) => {
      if (err) {
        return reject(err);
      }
      resolve(connection);
    });
  });
};

const query = (sqlQuery, callback) => {
  connect()
    .then(connection => {
      connection.query(sqlQuery, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });
      connection.end();
    })
    .catch(err => {
      callback(err);
    });
};

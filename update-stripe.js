const axios = require('axios');
const SECRETS = require('./secrets');

const server = axios.create({
  baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;

server.get('/usuarios/update-subscriptions')
  .then((resp) => console.log(resp))
  .catch((error) => {
    if (error.response) {
      console.error(`usuarios/update-subscriptions response error:: ${error.response.data}`);
    } else if (error.request) {
      console.error(`usuarios/update-subscriptions request error:: ${error.request}`);
    } else {
      console.error(`Something happened in setting up the request that triggered a usuarios/update-subscriptions error:: ${error.message}`);
    }
    console.error(error.config)
  });

server.get('/usuarios/update-expires-at')
  .then((resp) => console.log(resp))
  .catch((error) => {
    if (error.response) {
      console.error(`usuarios/update-expires-at response error:: ${error.response.data}`);
    } else if (error.request) {
      console.error(`usuarios/update-expires-at request error:: ${error.request}`);
    } else {
      console.error(`Something happened in setting up the request that triggered a usuarios/update-expires-at error:: ${error.message}`);
    }
    console.error(error.config)
  });

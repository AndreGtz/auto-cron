const axios = require('axios');
const SECRETS = require('./secrets');

const server = axios.create({
    baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;

server.post('/controlrecorrido/midnightcloseall/')
  .then((resp) => console.log(resp))
  .catch((error) => {
    if (error.response) {
      console.error(`midnightCloseAll response error:: ${error.response.data}`);
    } else if (error.request) {
      console.error(`midnightCloseAll request error:: ${error.request}`);
    } else {
      console.error(`Something happened in setting up the request that triggered a midnightCloseAll error:: ${error.message}`);
    }
    console.error(error.config)
  });

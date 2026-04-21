const axios = require('axios');
const SECRETS = require('./secrets');

const server = axios.create({
  baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;

server.delete('/bridge')
  .then((resp) => console.log(`bridgeLocationsCleanup success: ${new Date()} ::`, resp.data))
  .catch((error) => {
    if (error.response) {
      console.error(`bridgeLocationsCleanup response error:: ${error.response.data}`);
    } else if (error.request) {
      console.error(`bridgeLocationsCleanup request error:: ${error.request}`);
    } else {
      console.error(`bridgeLocationsCleanup setup error:: ${error.message}`);
    }
    console.error(error.config);
  });
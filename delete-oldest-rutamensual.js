const axios = require('axios');
const SECRETS = require('./secrets');

const server = axios.create({
    baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;

server.post('/rutasmensual/delete-old')
    .then(resp => console.log(resp))
    .catch(e => console.error(e));
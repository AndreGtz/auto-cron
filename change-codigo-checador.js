const axios = require('axios');
const SECRETS = require('./secrets');

const server = axios.create({
  baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;

const work = async () => {
  try {
    const { data } = await server.patch('/codigochecador/cambiar-codigos');
    console.log(`Códigos cambiados: ${new Date()} - Total: ${data.total}`);
  } catch (error) {
    console.error('Error al cambiar códigos:', error.message);
  }
};

work();

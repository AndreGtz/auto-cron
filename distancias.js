const axios = require('axios');
const Bottleneck = require('bottleneck');
const SECRETS = require('./secrets');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 6000,
});

limiter.on('failed', async (error, jobInfo) => console.error(`Request failed: ${error.message}`));

const priorities = {
  high: 5,
  normal: 3,
  low: 1,
};

const server = axios.create({
  baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;


const work = async () => {
  const { data: unidades} = await server.get('/unidades/usuarios/207').catch((err) => console.error(err));
  const keys = unidades.map((u) => u.idUnidad);
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const d = date.getDate();
  let m = date.getMonth() + 1;
  if (m < 10) {
    m = `0${m}`;
  }
  const y = date.getFullYear();
  for (let key in keys) {
    console.log(`requesting ${keys[key]}`);
    limiter.schedule({ priority: priorities.normal }, () => server.post('/sheets/reportegeneral/', {
      save: true,
      unidades: `[${keys[key]}]`,
      fechaI: `${d}-${m}-${y}`,
      fechaF: `${d}-${m}-${y}`,
    }).then(() => {
      console.log(`success: ${new Date()}`);
    })
      .catch((error) => {
        console.error(error);
      }));
  }
};

work();

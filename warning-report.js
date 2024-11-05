const axios = require('axios');
const SECRETS = require('./secrets');

const server = axios.create({
  baseURL: 'http://localhost:7000',
});

server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;

server.get('/unidades/risk/')
  .then((resp) => {
    const unidades = resp.data;
    const resumen = [];
    unidades.forEach((u) => {
      u.usuarios.forEach((usr) => {
        const msg = `Hemos detectado que la unidad ${u.unidad} no se ha movido recientemente, si la unidad se ha movido en los últimos 3 días contacte a su proveedor para hacer una revisión del equipo GPS`;
        // server.post('/notifications/sendexternal', {
        //   usuario: usr,
        //   msg,
        // }).catch((e) => console.error(e));
        resumen.push(`id: ${u.idUnidad} unidad: ${u.unidad} > ${usr?.usuario}`);
      });
    });
    server.post('/notifications/sendexternal', {
      usuario: { correo: 'asvieyra@caebes.com', alarmNotifications: 3, idUsuario: 1 },
      msg: resumen.join('\n'),
    }).catch((e) => console.error(e));
  })
  .catch((error) => console.error(error));

const fs = require('fs');
const axios = require('axios');
const SECRETS = require('./secrets');

try {
	const [,, fileName, routeId] = process.argv;
	if (routeId !== undefined && fileName !== undefined) {
		const idControlRuta = Number.parseInt(routeId, 10);
		if (!Number.isNaN(idControlRuta) && typeof idControlRuta === 'number' && idControlRuta > 0) {
			if (typeof fileName === 'string' && fileName.length > 0) {
				fs.readFile(fileName, function(err, data) {
					if (err) throw err; 
					const pointsData = JSON.parse(data); 
					const idControlRuta = Number.parseInt(routeId, 10);
					const pointsArray = pointsData?.coordsArray ?? [];
					if (Array.isArray(pointsArray) && pointsArray.length > 0) {
						const server = axios.create({ baseURL: SECRETS.serverUrl });
						server.defaults.headers.common['Authorization'] = `Bearer ${SECRETS.token}`;
						server
							.post('/controlpunto/add-points', { pointsArray, idControlRuta })
							.then((addPointsResult) => {
								const responseData = addPointsResult.data;
								console.log(responseData);
							})
							.catch((error) => {
								if (error.response) {
									console.error(`addPoints response error:: ${error.response.data}`);
								} else if (error.request) {
									console.error(`addPoints request error:: ${error.request}`);
								} else {
									console.error(`Something happened in setting up the request that triggered a addPoints error:: ${error.message}`);
								}
								throw new Error(error);
							});
					} else throw new Error('not valid pointsArray');
				});
			} else throw new Error('not valid fileName');
		} else throw new Error('not valid idControlRuta');
  } else throw new Error('undefined routeId and/or fileName');
} catch (error) {
  console.error('Error on controlpunto/add-points call');
  console.error(error);
}

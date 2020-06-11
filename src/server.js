import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import fetch from 'cross-fetch';
import * as sapper from '@sapper/server';
import fs from 'fs';

import { miyoIP, apiKey } from './_settings';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

const stream = fs.createWriteStream("data/all.json", {flags:'a'});

const fetchData =  async () => {
	// circuit/all
	var url = `http://${miyoIP}/api/circuit/all?apiKey=${apiKey}&`;

	try {
		const fetchRes = await fetch(url);

		if (fetchRes.status >= 400) {
			throw new Error("Bad response from server");
		}

		const data = await fetchRes.json();
		stream.write(JSON.stringify(data) + "\n");
	} catch (e) {
		console.error('test.json.js get:', e);
	}
}

setInterval(() => {
	fetchData();
}, 60000);

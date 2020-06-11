import fetch from 'cross-fetch';

import { miyoIP, apiKey } from '../../_settings';

export async function get(req, res) {
  // circuit/all
	var url = `http://${miyoIP}/api/${req.params.slug.join('/')}?apiKey=${apiKey}&`;

	try {
		const fetchRes = await fetch(url);

    if (fetchRes.status >= 400) {
      throw new Error("Bad response from server");
    }

		const data = await fetchRes.json();
    res.end(JSON.stringify(data));
  } catch (e) {
    console.error('test.json.js get:', e);
    res.end(JSON.stringify({error: e.message}));
  }
}

'use strict';

import { AsyncStorage } from 'react-native';

export default class VazillaProperty {
	static insertProperty(data, token) { var form = new FormData();
			form.append('name', data.name); form.append('surface', data.surface);
			form.append('price', data.price); form.append('description', data.description);
			form.append('address', data.address); form.append('logement', data.logement);
			form.append('location', data.location); 
		/*return fetch('http://localhost/api/v1/property/new', { method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type' : 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}` },
			body : data })
		.then((response) => { return response.json(); })
		.catch((error) => { console.log(error); });*/
		return form;
	}
}
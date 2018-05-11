'use strict';

import { AsyncStorage } from 'react-native';

export default class VazillaAuthentication {

	static userConnected() {
		return AsyncStorage.getItem('access_token').then((result) => { var O = { 'status' : true, 'token' : '', 'rtoken' : '' };
							if(result == null) { return JSON.stringify({ status : false }); }
							else { O.token = result; return AsyncStorage.getItem('refresh_token').then(
									(result) => { 
											if(result == null) { return JSON.stringify({ status : false }); }
											else { O.rtoken = result; return JSON.stringify(O); }
									});
							}
					});
	}
	
	static authenticateUser(email, password) {
		const form = new FormData(); form.append('email', email); form.append('password', password);
		return fetch('http://localhost/api/v1/account/login', { method: 'POST',
				headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
				body:  form })
			.then((result) => { return result.json(); })
			.catch((error) => { console.log(error); });
	}

	static registerUser(fullname, email, password) {
		const form = new FormData(); form.append('fullname', fullname); form.append('email', email); form.append('password', password);
		return fetch('http://localhost/api/v1/account/register', { method: 'POST',
				headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
				body:  form })
			.then((result) => { return result.json(); })
			.catch((error) => { console.log(error); });
	}

	static retrieveUser(token) {
		return fetch('http://localhost/api/v1/profile/retrieve', { method: 'GET',
				headers: { Accept: 'application/json', 'Authorization': `Bearer ${token}` } })
			.then((result) => { return result.json(); })
			.catch((error) => { console.log(error); })
	}

	static verifyAuthentication(token, rtoken) {
		return fetch('http://localhost/api/v1/profile/retrieve', { method: 'GET',
				headers: { Accept: 'application/json', 'Authorization': `Bearer ${token}` } })
			.then((result) => {
					if(result.status !== 200) {
							console.log('JWT token non valide, reconnexion');
							return this.refreshAuthentication(rtoken);
					} else if(result.status == 200) { console.log('JWT token valide'); return true; }
			}).catch((error) => { console.log(error); return true; })
	}

	static storageInformation(user) {
		if(user.hasOwnProperty('access_token') && user.hasOwnProperty('refresh_token')) {
			return AsyncStorage.setItem('access_token', user.access_token).then(
				(error) => { if(error) { return false; }
					AsyncStorage.setItem('refresh_token', user.refresh_token).then(
						(error) => { if(error) { return false; } return true; });
				});
		} else { return false; }
	}

	static refreshAuthentication(token) {
			const form = new FormData();
				form.append('refresh_token', token);
		return fetch('http://localhost/api/v1/account/refresh', { method: 'POST', 
				headers: { Accept: 'application/json', 'Content-Type' : 'application/x-www-form-urlencoded' },
				body: form })
			.then((result) => { 
				if(result.status !== 200) { return false; }
				else if(result.hasOwnProperty('access_token')) { console.log('reconnexion à succès.');
					return this.storageInformation(result.json()); 
			} }).catch((error) => { console.log(error); return false; });
	}

	static logoutUser() {
		return AsyncStorage.getItem('access_token').then((token) => {
			return fetch('http://localhost/api/v1/account/logout', { method: 'POST',
					headers : { Accept: 'application/json', 'Authorization' : `Bearer {$token}`} })
				.then((result) => {
					if(result.status == 200) { return true; }
					else if(result.status !== 200) { return false; }
				}).catch((error) => { console.log(error); return false; });
		});
	}
}
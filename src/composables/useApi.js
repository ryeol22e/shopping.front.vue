import { usePageLink } from '@/composables/usePageLink';
import useUtils from '@/composables/useUtils';
import { stringify } from 'qs';

const { isEmpty } = useUtils();
const { errorPage } = usePageLink();

const BASE_URL = '/api';
const fetchFunc = async (path, data, resolve, reject) => {
	if (data.status === 200) {
		resolve({ data: await data.json() });
	} else {
		reject({ ...data, path });
		if (!path.includes('login') && !path.includes('join') && !path.includes('logout')) {
			errorPage(500);
		}
	}
};

const appApi = {
	async get(path, param = null) {
		const queryString = !isEmpty(param) ? `?${stringify(param)}` : '';
		const data = await fetch(`${BASE_URL}${path}${queryString}`, {
			method: 'get',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
		});

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async post(path, param = {}) {
		const data = await fetch(`${BASE_URL}${path}`, {
			method: 'post',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(param),
		});

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async login(path, param = {}) {
		const data = await fetch(`${BASE_URL}${path}`, {
			method: 'post',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: stringify(param),
		});

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async uploadFile(path, param = new FormData()) {
		const data = await fetch(`${BASE_URL}${path}`, {
			method: 'post',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {
				'Content-Type': 'multipart/form-data;charset=UTF-8',
			},
			body: param,
		});

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
};

export { appApi };

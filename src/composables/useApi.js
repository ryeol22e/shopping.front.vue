import { usePageLink } from '@/composables/usePageLink';
import { useUtils } from '@/composables/useUtils';
import { stringify } from 'qs';

const { isEmpty } = useUtils();
const { errorPage } = usePageLink();

const BASE_URL = '/api';
const fetchFunc = async (path, res, resolve, reject) => {
	if (res.status === 200) {
		try {
			resolve({ data: await res.json() });
		} catch (error) {
			resolve({ data: null });
		}
	} else {
		reject({ ...res, path });
		if (!path.includes('login') && !path.includes('join') && !path.includes('logout')) {
			errorPage(500);
		}
	}
};

const appApi = {
	async get(path, param = {}) {
		const queryString = !isEmpty(param) ? `?${stringify(param)}` : '';
		const options = {
			method: 'get',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {},
		};

		const res = await fetch(`${BASE_URL}${path}${queryString}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, res, resolve, reject));
	},
	async post(path, param = {}) {
		const options = {
			method: 'post',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {},
			body: param,
		};

		if (param.constructor === Object) {
			options.headers['Content-Type'] = 'application/json;charset=UTF-8;';
			options.body = JSON.stringify(param);
		}

		const res = await fetch(`${BASE_URL}${path}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, res, resolve, reject));
	},
};

export const useApi = () => ({ appApi });

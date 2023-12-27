import { usePageLink } from '@/composables/usePageLink';
import { useUtils } from '@/composables/useUtils';
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
	async get(path, param = {}) {
		const queryString = !isEmpty(param) ? `?${stringify(param)}` : '';
		const options = {
			method: 'get',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {},
		};

		const data = await fetch(`${BASE_URL}${path}${queryString}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async post(path, param = {}) {
		const options = {
			method: 'post',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {},
			body: JSON.stringify(param),
		};

		if (param.constructor === FormData) {
			options.body = param;
		}

		const data = await fetch(`${BASE_URL}${path}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
};

export const useApi = () => ({ appApi });

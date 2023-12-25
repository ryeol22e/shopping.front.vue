import { usePageLink } from '@/composables/usePageLink';
import { useStorage } from '@/composables/useStorage';
import { useUtils } from '@/composables/useUtils';
import { stringify } from 'qs';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const { isEmpty } = useUtils();
const { appCookie } = useStorage();
const { getCookie } = appCookie();
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
		const token = getCookie(ACCESS_TOKEN);
		const queryString = !isEmpty(param) ? `?${stringify(param)}` : '';
		const options = {
			method: 'get',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {},
		};

		if (!isEmpty(token)) {
			options.headers['Authorization'] = `Bearer ${token}`;
		}
		const data = await fetch(`${BASE_URL}${path}${queryString}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async post(path, param = {}) {
		const token = getCookie(ACCESS_TOKEN);
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

		if (!isEmpty(token)) {
			options.headers['Authorization'] = `Bearer ${token}`;
		}

		const data = await fetch(`${BASE_URL}${path}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
};

export const useApi = () => ({ appApi });

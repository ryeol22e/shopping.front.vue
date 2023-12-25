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
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
		};
		if (!isEmpty(token)) {
			options.headers['Authroization'] = `Bearer ${token}`;
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
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(param),
		};

		if (param.constructor === FormData) {
			let isExistsFile = false;

			for (const key of param.keys()) {
				const value = param.get(key);

				if (value.constructor === FileList || value.constructor === File) {
					isExistsFile = true;
					break;
				}
			}

			if (isExistsFile) {
				options.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
				options.body = param;
			} else {
				options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
				options.body = new URLSearchParams(param);
			}
		}

		if (!isEmpty(token)) {
			options.headers['Authroization'] = `Bearer ${token}`;
		}

		const data = await fetch(`${BASE_URL}${path}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
};

export const useApi = () => ({ appApi });

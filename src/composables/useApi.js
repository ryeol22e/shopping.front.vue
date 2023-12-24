import { usePageLink } from '@/composables/usePageLink';
import { stringify } from 'qs';

import useUtils from '@/composables/useUtils';
import useStorage from '@/composables/useStorage';

const AUCCESS_TOKEN = 'AUCCESS_TOKEN';
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
		if (!isEmpty(getCookie(AUCCESS_TOKEN))) {
			options.headers['Authroization'] = `Bearer ${getCookie(AUCCESS_TOKEN)}`;
		}
		const data = await fetch(`${BASE_URL}${path}${queryString}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async post(path, param = {}) {
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
				if (key.constructor === FileList || key.constructor === File) {
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

		if (!isEmpty(getCookie(AUCCESS_TOKEN))) {
			options.headers['Authroization'] = `Bearer ${getCookie(AUCCESS_TOKEN)}`;
		}

		const data = await fetch(`${BASE_URL}${path}`, options);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
};

export default () => ({ appApi });

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
	async get(path, param = {}) {
		const queryString = !isEmpty(param) ? `?${stringify(param)}` : '';
		const data = await fetch(`${BASE_URL}${path}${queryString}`, {
			method: 'get',
			mode: 'same-origin',
			credentials: 'include',
			cache: 'default',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
		});

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
	async post(path, param = {}) {
		const option = {
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
				option.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
				option.body = param;
			} else {
				option.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
				option.body = new URLSearchParams(param);
			}
		}

		const data = await fetch(`${BASE_URL}${path}`, option);

		return new Promise((resolve, reject) => fetchFunc(path, data, resolve, reject));
	},
};

export default () => ({ appApi });

import axios from 'axios';
import { parse, stringify } from 'qs';
import { usePageLink } from './usePageLink';

const { errorPage } = usePageLink();

const api = axios.create({
	baseURL: '/api',
	responseType: 'json',
	responseEncoding: 'utf8',
	timeout: 2000,
	paramsSerializer: { encode: parse, serialize: stringify },
});

api.interceptors.request.use(
	(res) => res,
	(error) => Promise.reject(error),
);
api.interceptors.response.use(
	(res) => res,
	(error) => {
		const url = String(error.request.responseURL);

		if (!url.includes('login') && !url.includes('join') && !url.includes('logout')) {
			errorPage(500);
		}

		return Promise.reject(error);
	},
);

export { api };

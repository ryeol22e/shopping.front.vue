import axios from 'axios';
import { parse, stringify } from 'qs';

const api = axios.create({
	baseURL: '/api',
	responseType: 'json',
	responseEncoding: 'utf8',
	paramsSerializer: { encode: parse, serialize: stringify },
});

api.interceptors.request.use(
	res => res,
	error => Promise.reject(error),
);
api.interceptors.response.use(
	res => res,
	error => Promise.reject(error),
);

export { api };

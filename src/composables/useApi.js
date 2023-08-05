import axios from 'axios';
import { parse, stringify } from 'qs';
import { useRouter } from 'vue-router';
const api = axios.create({
	baseURL: '/api',
	responseType: 'json',
	responseEncoding: 'utf8',
	paramsSerializer: { encode: parse, serialize: stringify },
});

api.interceptors.request.use(
	(res) => res,
	(error) => Promise.reject(error),
);
api.interceptors.response.use(
	(res) => res,
	(error) => useRouter().push({ name: 'Error', state: { erorType: 500 }, query: {}, params: {} }),
);

export { api };

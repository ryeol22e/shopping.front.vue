import axios from "axios"
import qs from 'qs'

const api = axios.create({
	baseURL : import.meta.env.VITE_API_URL,
	responseType : 'json',
	responseEncoding : 'utf8',
	paramsSerializer : params=> qs.stringify(params),
})

api.interceptors.request.use(res=> res, error=> Promise.reject(error))
api.interceptors.response.use(res=> res, error=> Promise.reject(error))

export {api}
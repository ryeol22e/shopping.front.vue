import qs from 'qs';
import axios from 'axios';
import router from '@/router';

export const useConfig = ()=> {
	const axiosConfig = ()=> {
		axios.defaults.baseURL = process.env.VUE_APP_API_URL;
		axios.defaults.responseType = 'json';
		axios.defaults.responseEncoding = 'UTF-8';
		axios.defaults.paramsSerializer = params=> {
			return qs.stringify(params);
		};
	
	// 	axios.interceptors.response.use(res=> {
	// 		return res;
	// 	}, error=>{
	// 		const regex = /40[0-9]/gi;
	// 		const status = error.response.status;
			
	// 		if(regex.test(status)) {
	// 			error.message = 'please login.';
	// 			router.push('/login');
	// 		}
	
	// 		return Promise.reject(error);
	//   });
	};

	return {
		axiosConfig,
	};
}


import { defineStore } from "pinia";
import axios from "axios";
import router from '@/router/index.js';

export const useStoreBo = defineStore('useStoreBo', {
	state : ()=> ({
		bannerInfo : {},
	}),
	getters : {

	},
	actions : {
		registBannerInfo(data) {
			axios.post('/admin/banner/save', data, {
				headers : {
					'Content-Type' : 'multipart/form-data',
				}
			})
			.then(res=> {
				const result = res.data;

				if(result) {
					alert('저장완료되었습니다.');
					router.go();
				}
			})
			.catch(error=> console.log(error));
		}
	}
});
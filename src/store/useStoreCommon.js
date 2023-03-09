import { defineStore } from 'pinia';
import { api } from '@/composables/useApi.js';

export default defineStore('common', {
	state: () => ({
		headers: [],
		adminLnb: [],
		mypage: [],
	}),
	getters: {
		getHeaders: state => state.headers,
		getAdminLnb: state => state.adminLnb,
		getMypage: state => state.mypage,
	},
	actions: {
		async setHeaders() {
			await api
				.get('/common/10000', {
					params: {
						codeType: '10000',
						codeDepth: '1',
						useYn: 'Y',
					},
				})
				.then(res => (this.headers = res.data))
				.catch(error => console.log(error));
		},
		async setAdminLnb() {
			await api
				.get('/admin/menu', {
					params: {
						codeType: '10003',
						codeDepth: '1',
						useYn: 'Y',
					},
				})
				.then(res => (this.adminLnb = res.data))
				.catch(error => console.log(error));
		},
		async setMypageList() {
			await api
				.get('/common/10002', {
					params: {
						codeType: '10002',
						codeDepth: '1',
						useYn: 'Y',
					},
				})
				.then(res => (this.mypage = res.data))
				.catch(error => console.log(error));
		},
	},
});

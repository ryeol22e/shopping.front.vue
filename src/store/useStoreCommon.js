import { defineStore } from 'pinia';
import { api } from '@/composables/useAxios.js';

export default defineStore('common', {
	state: () => ({
		headers: [],
		adminLnb: [],
		mypage: [],
		isLoadingShow: false,
	}),
	getters: {
		getHeaders: state => state.headers,
		getAdminLnb: state => state.adminLnb,
		getMypage: state => state.mypage,
		getIsLoadingShow: state => state.isLoadingShow,
	},
	actions: {
		setIsLoadingShow(bool) {
			this.isLoadingShow = bool;
		},
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
		setMypageList() {
			api.get('/common/10002', {
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

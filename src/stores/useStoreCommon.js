import { api } from '@/composables/useApi';
import { defineStore } from 'pinia';

export const useStoreCommon = defineStore('useStoreCommon', {
	state: () => ({
		headers: [],
		adminLnb: [],
		mypageList: [],
	}),
	getters: {
		getHeaders: (state) => state.headers,
		getAdminLnb: (state) => state.adminLnb,
		getMypageList: (state) => state.mypageList,
	},
	actions: {
		async setHeaders(params) {
			await api
				.get('/common/10000', { params })
				.then((res) => (this.headers = res.data))
				.catch((error) => console.log(error));
		},
		async setAdminLnb(params) {
			await api
				.get('/admin/menu', { params })
				.then((res) => (this.adminLnb = res.data))
				.catch((error) => console.log(error));
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
				.then((res) => (this.mypageList = res.data))
				.catch((error) => console.log(error));
		},
	},
});

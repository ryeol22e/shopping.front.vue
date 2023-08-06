import { defineStore } from 'pinia';
import { api } from '@/composables/useApi';

export const useStoreMain = defineStore('useStoreMain', {
	state: () => ({
		bannerList: [],
	}),
	getters: {
		getBannerList: (state) => state.bannerList,
	},
	actions: {
		async setBannerList(param) {
			await api
				.get('/display/main/banner', {
					params: param,
				})
				.then((res) => (this.bannerList = res.data))
				.catch((error) => console.log(error));
		},
	},
});

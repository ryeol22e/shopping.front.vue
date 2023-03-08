import useStoreCommon from './useStoreCommon';
import { defineStore } from 'pinia';
import { api } from '@/composables/useAxios.js';

const useCommon = useStoreCommon();

export default defineStore('main', {
	state: () => ({
		bannerList: [],
	}),
	getters: {
		getBannerList: state => state.bannerList,
	},
	actions: {
		async setBannerList(param) {
			useCommon.setIsLoadingShow(true);
			await api
				.get('/display/main/banner', {
					params: param,
				})
				.then(res => (this.bannerList = res.data))
				.catch(error => console.log(error));
			useCommon.setIsLoadingShow(false);
		},
	},
});

import useApi from '@/composables/useApi';
import { defineStore } from 'pinia';

export const useStoreMain = () => {
	const { appApi } = useApi();

	return defineStore('useStoreMain', {
		state: () => ({
			bannerList: [],
		}),
		getters: {
			getBannerList: (state) => state.bannerList,
		},
		actions: {
			async setBannerList(param) {
				await appApi
					.get('/display/main/banner', param)
					.then((res) => (this.bannerList = res.data))
					.catch((error) => console.log(error));
			},
		},
	})();
};

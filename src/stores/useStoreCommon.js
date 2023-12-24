import { useApi } from '@/composables/useApi';
import { defineStore } from 'pinia';

export const useStoreCommon = () => {
	const { appApi } = useApi();

	return defineStore('useStoreCommon', {
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
			async setHeaders(param) {
				await appApi
					.get('/common/10000', param)
					.then((res) => (this.headers = res.data))
					.catch((error) => console.log(error));
			},
			async setAdminLnb(param) {
				await appApi
					.get('/admin/menu', param)
					.then((res) => (this.adminLnb = res.data))
					.catch((error) => console.log(error));
			},
			async setMypageList() {
				await appApi
					.get('/common/10002', {
						codeType: '10002',
						codeDepth: '1',
						useYn: 'Y',
					})
					.then((res) => (this.mypageList = res.data))
					.catch((error) => console.log(error));
			},
		},
	})();
};

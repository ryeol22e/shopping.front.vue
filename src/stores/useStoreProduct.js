import { useApi } from '@/composables/useApi';
import { defineStore } from 'pinia';

export const useStoreProduct = () => {
	const { appApi } = useApi();

	return defineStore('useStoreProduct', {
		state: () => ({
			list: [],
			detail: {},
			cateList: [],
		}),
		getters: {
			getList: (state) => state.list,
			getDetail: (state) => state.detail,
			getCateList: (state) => state.cateList,
		},
		actions: {
			async setList(params) {
				await appApi
					.get(`/display/product/list`, {
						...params,
						useYn: 'Y',
						dispYn: 'Y',
					})
					.then((res) => (this.list = res.data))
					.catch((error) => console.log(error));
			},
			async setDetail(prdtNo) {
				await appApi
					.get(`/product/${prdtNo}`)
					.then((res) => (this.detail = res.data))
					.catch((error) => console.log(error));
			},
			async setCateList(param) {
				await appApi
					.get(`/cate/list`, param)
					.then((res) => (this.cateList = res.data))
					.catch((error) => console.log(error));
			},
		},
	})();
};

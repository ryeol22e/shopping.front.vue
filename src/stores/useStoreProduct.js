import { useApi } from '@/composables/useApi';
import { defineStore } from 'pinia';

export const useStoreProduct = () => {
	const { appApi } = useApi();

	return defineStore('useStoreProduct', {
		state: () => ({
			list: [],
			detail: {},
			cateList: [],
			saveProductResult: false,
		}),
		getters: {
			getList: (state) => state.list,
			getDetail: (state) => state.detail,
			getCateList: (state) => state.cateList,
			getPrdtResult: (state) => state.saveProductResult,
		},
		actions: {
			async setList(cateNo) {
				await appApi
					.get(`/display/product/list`, {
						cateNo: cateNo,
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
			async setProductData(data) {
				const prdtNo = data.get('prdtNo');
				await appApi
					.uploadFile(`/product/${prdtNo}`, data)
					.then((res) => (this.saveProductResult = res.data || false))
					.catch((error) => console.log(error));
			},
		},
	})();
};

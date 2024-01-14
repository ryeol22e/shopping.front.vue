import { useApi } from '@/composables/useApi';
import { useUtils } from '@/composables/useUtils';
import { defineStore } from 'pinia';

export const useStoreProduct = () => {
	const { appApi } = useApi();
	const { isEmpty } = useUtils();

	return defineStore('useStoreProduct', {
		state: () => ({
			lastPrdtNo: null,
			list: [],
			detail: {},
			cateList: [],
		}),
		getters: {
			getLastPrdtNo: (state) => state.lastPrdtNo,
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
					.then((res) => {
						const list = res.data;

						if (!isEmpty(list)) {
							this.lastPrdtNo = list[list.length - 1].prdtNo || null;
							this.list = list;
						} else {
							this.list = [];
						}
					})
					.catch((error) => console.log(error));
			},
			async addList(params) {
				await appApi
					.get(`/display/product/list`, {
						...params,
						useYn: 'Y',
						dispYn: 'Y',
					})
					.then((res) => {
						const list = res.data;

						if (!isEmpty(list)) {
							this.lastPrdtNo = list[list.length - 1].prdtNo || null;
							this.list = this.list.concat(list);
						}
					})
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

import useStoreCommon from './useStoreCommon';
import { defineStore } from 'pinia';
import { api } from '@/composables/useAxios.js';

const useCommon = useStoreCommon();
export const useStoreProduct = defineStore('useStoreProduct', {
	state: () => ({
		list: [],
		detail: {},
		cateList: [],
		saveProductResult: false,
	}),
	getters: {
		getList: state => state.list,
		getDetail: state => state.detail,
		getCateList: state => state.cateList,
		getPrdtResult: state => state.saveProductResult,
	},
	actions: {
		async setList(cateNo) {
			useCommon.setIsLoadingShow(true);
			await api
				.get(`/display/product/list`, {
					params: {
						cateNo: cateNo,
						useYn: 'Y',
						dispYn: 'Y',
					},
				})
				.then(res => (this.list = res.data))
				.catch(error => console.log(error));
			useCommon.setIsLoadingShow(false);
		},
		async setDetail(prdtNo) {
			await api
				.get(`/product/${prdtNo}`)
				.then(res => (this.detail = res.data))
				.catch(error => console.log(error));
		},
		async setCateList(param) {
			await api
				.get(`/cate/list`, {
					params: param,
				})
				.then(res => (this.cateList = res.data))
				.catch(error => console.log(error));
		},
		async setProductData(data) {
			const prdtNo = data.get('prdtNo');
			await api
				.post(`/product/${prdtNo}`, data, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(res => (this.saveProductResult = res.data || false))
				.catch(error => console.log(error));
		},
	},
});

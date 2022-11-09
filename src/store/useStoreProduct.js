import { defineStore } from "pinia";
import axios from "axios";

export const useStoreProduct = defineStore('useStoreProduct', {
	state : ()=> ({
		list : [],
		detail : {},
		cateList : [],
		saveProductResult : false,
	}),
	getters : {
		getList : state=> state.list,
		getDetail : state=> state.detail,
		getCateList : state=> state.cateList,
		getPrdtResult : state=> state.saveProductResult,
	},
	actions : {
		async setList(cateNo) {
			this.list = await axios.get('/display/product/list', {
				params : {
					cateNo : cateNo,
					useYn : 'Y',
					dispYn : 'Y',
				}
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		async setDetail(prdtNo) {
			this.detail = await axios.get(`/product/${prdtNo}`)
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		async setCateList(param) {
			this.cateList = await axios.get(`/cate/list`, {
				params : param,
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		async setProductData(data) {
			const prdtNo = data.get('prdtNo');
			this.saveProductResult = await axios.post(`/product/${prdtNo}`, data, {
				headers : {
					'Content-Type' : 'multipart/form-data',
				}
			})
				.then(res=> res.data)
				.catch(error=> {
					console.log(error);
					return false;
				});
		}
	}
});
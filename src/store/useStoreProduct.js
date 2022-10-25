import { defineStore } from "pinia";
import axios from "axios";

export const useStoreProduct = defineStore('useStoreProduct', {
	state : ()=> ({
		list : [],
		detail : {},
	}),
	getters : {
		getList : state=> state.list,
		getDetail : state=> state.detail,
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
		}
	}
});
import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('common', {
	state : ()=> ({
		headers : [],
		adminLnb : [],
	}),
	getters : {
		getHeaders : state=> state.headers,
		getAdminLnb : state=> state.adminLnb,
	},
	actions : {
		async setHeaders() {
			this.headers = await axios.get('/common/headers', {
				params : {
					codeType : '10000',
					codeDepth : '1',
					useYn : 'Y',
				}
			}).then(res=> res.data)
			.catch(error=> console.log(error));
		},
		async setAdminLnb() {
			this.adminLnb = await axios.get('/admin/menu', {
				params : {
					codeType : '10003',
					codeDepth : '1',
					useYn : 'Y'
				}
			}).then(res=> res.data)
			.catch(error=> console.log(error));
		}
	}
});
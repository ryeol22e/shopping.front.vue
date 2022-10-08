import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('common', {
	state : ()=> ({
		headers : [],
	}),
	getters : {
		getHeaders : state=> state.headers,
	},
	actions : {
		async setHeaders() {
			this.headers = await axios.get('/common/headers', {
				params : {
					codeType : '10000',
					codeDepth : '1',
				}
			}).then(res=> res.data)
			.catch(error=> console.log(error));
		}
	}
});
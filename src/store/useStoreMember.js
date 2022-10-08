import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('member', {
	state : ()=> ({
		isLogin : false,
	}),
	getters : {
		isLogin : state=> state.isLogin,
	},
	actions : {
		async loginProcess(param) {
			this.isLogin = await axios.get('/api/login', {
				params : param
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		}
	}
})
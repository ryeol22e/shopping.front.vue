import { defineStore } from 'pinia';

export const useStoreVariable = defineStore('useStoreVariable', {
	state: () => ({
		reqParam: {},
	}),
	getters: {
		getReqParam: (state) => state.reqParam,
	},
	actions: {
		setReqParam(data = {}) {
			console.log(data);
			this.reqParam = data;
		},
	},
});

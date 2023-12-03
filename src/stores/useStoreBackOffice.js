import { appApi } from '@/composables/useApi';
import router from '@/router/index';
import { defineStore } from 'pinia';

export const useStoreBo = defineStore('useStoreBo', {
	state: () => ({
		bannerInfo: {},
	}),
	getters: {},
	actions: {
		registBannerInfo(param) {
			appApi
				.uploadFile('/admin/banner/save', param)
				.then((res) => {
					const result = res.data;

					if (result) {
						alert('저장완료되었습니다.');
						router.go();
					}
				})
				.catch((error) => console.log(error));
		},
	},
});

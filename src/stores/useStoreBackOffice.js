import { useApi } from '@/composables/useApi';
import { reloadPage } from '@/composables/usePageLink';
import { defineStore } from 'pinia';

export const useStoreBo = () => {
	const { appApi } = useApi();

	return defineStore('useStoreBo', {
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
							reloadPage();
						}
					})
					.catch((error) => console.log(error));
			},
		},
	})();
};

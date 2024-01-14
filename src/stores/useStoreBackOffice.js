import { useApi } from '@/composables/useApi';
import { usePageLink } from '@/composables/usePageLink';
import { defineStore } from 'pinia';

export const useStoreBo = () => {
	const { appApi } = useApi();
	const { reloadPage } = usePageLink();

	return defineStore('useStoreBo', {
		state: () => ({
			bannerInfo: {},
			saveProductResult: false,
		}),
		getters: {
			getPrdtResult: (state) => state.saveProductResult,
		},
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
			async setProductData(data) {
				const prdtNo = data.get('prdtNo');
				await appApi
					.post(`/admin/product/${prdtNo}`, data)
					.then((res) => (this.saveProductResult = res.data || false))
					.catch((error) => console.log(error));
			},
		},
	})();
};

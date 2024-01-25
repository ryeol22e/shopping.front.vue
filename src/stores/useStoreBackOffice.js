import { useApi } from '@/composables/useApi';
import { usePageLink } from '@/composables/usePageLink';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useStoreBo = defineStore('useStoreBo', () => {
	const { fetchPost } = useApi();
	const { reloadPage } = usePageLink();

	const bannerInfo = ref({});
	const saveProductResult = ref(false);

	const getPrdtResult = computed(() => saveProductResult.value);
	const registBannerInfo = (param) => {
		fetchPost('/admin/banner/save', param)
			.then((res) => {
				const result = res.data;

				if (result) {
					alert('저장완료되었습니다.');
					reloadPage();
				}
			})
			.catch((error) => console.log(error));
	};
	const setProductData = async (data) => {
		const prdtNo = data.get('prdtNo');

		fetchPost(`/admin/product/${prdtNo}`, data)
			.then((res) => (saveProductResult.value = res.data || false))
			.catch((error) => console.log(error));
	};

	return {
		getPrdtResult,
		registBannerInfo,
		setProductData,
	};
});

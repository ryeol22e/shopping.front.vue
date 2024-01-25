import { useApi } from '@/composables/useApi';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useStoreMain = defineStore('useStoreMain', () => {
	const { fetchGet } = useApi();

	const bannerList = ref([]);

	const getBannerList = computed(() => bannerList.value);

	const setBannerList = async (param) => {
		await fetchGet('/display/main/banner', param)
			.then((res) => (bannerList.value = res.data))
			.catch((error) => console.log(error));
	};

	return {
		getBannerList,
		setBannerList,
	};
});

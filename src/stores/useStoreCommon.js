import { useApi } from '@/composables/useApi';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useStoreCommon = defineStore('useStoreCommon', () => {
	const { fetchGet } = useApi();

	const headers = ref([]);
	const adminLnb = ref([]);
	const mypageList = ref([]);

	const getHeaders = computed(() => headers.value);
	const getAdminLnb = computed(() => adminLnb.value);
	const getMypageList = computed(() => mypageList.value);

	const setHeaders = async (param) => {
		await fetchGet('/common/10000', param)
			.then((res) => (headers.value = res.data))
			.catch((error) => console.log(error));
	};
	const setAdminLnb = async (param) => {
		await fetchGet('/admin/menu', param)
			.then((res) => (adminLnb.value = res.data))
			.catch((error) => console.log(error));
	};
	const setMypageList = async () => {
		await fetchGet('/common/10002', {
			codeType: '10002',
			codeDepth: '1',
			useYn: 'Y',
		})
			.then((res) => (mypageList.value = res.data))
			.catch((error) => console.log(error));
	};

	return {
		getHeaders,
		getAdminLnb,
		getMypageList,
		setHeaders,
		setAdminLnb,
		setMypageList,
	};
});

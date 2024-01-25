import { useApi } from '@/composables/useApi';
import { useUtils } from '@/composables/useUtils';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStoreProduct = defineStore('useStoreProduct', () => {
	const { fetchGet } = useApi();
	const { isEmpty } = useUtils();

	const lastPrdtNo = ref(null);
	const list = ref([]);
	const detail = ref({});
	const cateList = ref([]);

	const getLastPrdtNo = computed(() => lastPrdtNo.value);
	const getList = computed(() => list.value);
	const getDetail = computed(() => detail.value);
	const getCateList = computed(() => cateList.value);

	const setList = async (param) => {
		await fetchGet(`/display/product/list`, {
			...param,
			useYn: 'Y',
			dispYn: 'Y',
		})
			.then((res) => {
				const array = res.data;

				if (!isEmpty(array)) {
					lastPrdtNo.value = array[array.length - 1].prdtNo || null;
					list.value = array;
				} else {
					list.value = [];
				}
			})
			.catch((error) => console.log(error));
	};
	const addList = async (param) => {
		await fetchGet(`/display/product/list`, {
			...param,
			useYn: 'Y',
			dispYn: 'Y',
		})
			.then((res) => {
				const array = res.data;

				if (!isEmpty(array)) {
					lastPrdtNo.value = array[array.length - 1].prdtNo || null;
					list.value = list.value.concat(array);
				}
			})
			.catch((error) => console.log(error));
	};
	const setDetail = async (prdtNo) => {
		await fetchGet(`/product/${prdtNo}`)
			.then((res) => (detail.value = res.data))
			.catch((error) => console.log(error));
	};
	const setCateList = async (param) => {
		await fetchGet(`/cate/list`, param)
			.then((res) => (cateList.value = res.data))
			.catch((error) => console.log(error));
	};

	return {
		getLastPrdtNo,
		getList,
		getDetail,
		getCateList,
		setList,
		addList,
		setDetail,
		setCateList,
	};
});

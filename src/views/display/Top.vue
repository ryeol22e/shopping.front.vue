<template>
	<main>
		<DisplayHeader title="TOP" desc="상의" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import useMetaInfo from '@/composables/useMetaInfo';

	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted } from 'vue';
	import { useMeta } from 'vue-meta';

	const useProduct = useStoreProduct();
	const { getMetaInfo } = useMetaInfo();
	const list = computed(() => useProduct.getList);

	useMeta(getMetaInfo('Top'));
	onMounted(() => {});

	await useProduct.setList('1357900001');
</script>

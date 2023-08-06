<template>
	<main>
		<DisplayHeader title="OUTER" desc="외투" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { usePageLink } from '@/composables/usePageLink';
	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted } from 'vue';

	const { movePage } = usePageLink();
	const useProduct = useStoreProduct();
	const list = computed(() => useProduct.getList);

	await useProduct.setList('1357900002');

	onMounted(() => {});
</script>

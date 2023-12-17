<template>
	<main>
		<DisplayHeader title="TOP" desc="상의" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';

	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted } from 'vue';

	const useProduct = useStoreProduct();

	const list = computed(() => useProduct.getList);

	onMounted(() => {});

	await useProduct.setList('1357900001');
</script>

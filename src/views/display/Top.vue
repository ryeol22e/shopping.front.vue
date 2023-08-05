<template>
	<main>
		<DisplayHeader title="TOP" desc="상의" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStoreProduct } from '@/stores/useStoreProduct.js';

	const route = useRoute();
	const useProduct = useStoreProduct();
	const list = computed(() => useProduct.getList);

	await useProduct.setList('1357900001');
	onMounted(() => {});
</script>

<template>
	<main>
		<DisplayHeader title="OUTER" desc="외투" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import { onMounted, computed } from 'vue';
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { useRoute } from 'vue-router';
	import { useStoreProduct } from '@/store/useStoreProduct.js';

	const route = useRoute();
	const useProduct = useStoreProduct();
	const list = computed(() => useProduct.getList);

	await useProduct.setList('1357900002');

	onMounted(() => {});
</script>

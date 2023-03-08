<template>
	<main>
		<DisplayHeader title="PROMOTION" desc="프로모션" />
		<ProductList v-if="!useStoreCommon().getIsLoadingShow" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { useRoute } from 'vue-router';
	import { useStoreProduct } from '@/store/useStoreProduct.js';
	import useStoreCommon from '@/store/useStoreCommon';

	const route = useRoute();
	const useProduct = useStoreProduct();
</script>

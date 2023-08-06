<template>
	<main>
		<DisplayHeader title="PROMOTION" desc="프로모션" />
		<ProductList />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import { usePageLink } from '@/composables/usePageLink';
	import { useStoreProduct } from '@/stores/useStoreProduct';

	const { movePage } = usePageLink();
	const useProduct = useStoreProduct();
</script>

<template>
	<main>
		<DisplayHeader title="Acc" desc="악세사리"/>
		<ProductList :list="list"/>
	</main>
</template>

<script setup>
	import { onMounted, computed } from 'vue';
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';
	import {useRoute} from 'vue-router';
	import {useStoreProduct} from '@/store/useStoreProduct.js';
	
	const route = useRoute();
	const useProduct = useStoreProduct();
	const list = computed(()=> useProduct.getList);

	onMounted(()=> {
		useProduct.setList('1357900005');
	});
</script>

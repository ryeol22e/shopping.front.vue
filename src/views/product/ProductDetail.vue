<template>
	<h1>상품상세</h1>
</template>

<script setup>
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import {useStoreProduct} from '@/store/useStoreProduct.js';

	const route = useRoute();
	const useProduct = useStoreProduct();
	const product = computed(()=> useProduct.getDetail);
	
	onMounted(()=> {
		useProduct.setDetail(route.params.prdtNo);
	});

</script>
<template>
	<main>
		<DisplayHeader title="EVENT" desc="쇼핑몰 이벤트~"/>
		
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import {useRoute} from 'vue-router';
	import {useStoreProduct} from '@/store/useStoreProduct.js';
	
	const route = useRoute();
	const useProduct = useStoreProduct();
</script>

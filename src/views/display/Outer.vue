<template>
	<main>
		<DisplayHeader title="OUTER" desc="외투" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';

	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted, onUnmounted, ref } from 'vue';

	const storeProduct = useStoreProduct();
	const page = ref(1);
	const reqParam = {
		cateNo: '1357900002',
		page: page.value,
	};
	const list = computed(() => storeProduct.getList);
	const morePrdouctList = () => {
		const scrollPosition = window.scrollY;
		const windowHeight = window.innerHeight;
		const fullHeight = document.body.scrollHeight;

		if (scrollPosition + windowHeight >= fullHeight) {
			reqParam.page = ++page.value;
			storeProduct.setList(reqParam);
		}
	};

	onMounted(() => {
		window.addEventListener('scroll', morePrdouctList);
	});
	onUnmounted(() => {
		window.removeEventListener('scroll', morePrdouctList);
	});

	await storeProduct.setList(reqParam);
</script>

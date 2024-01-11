<template>
	<main>
		<DisplayHeader title="PANTS" desc="하의" />
		<ProductList :list="list" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import ProductList from '@/components/display/ProductList.vue';

	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted, onUnmounted, ref } from 'vue';

	const storeProduct = useStoreProduct();

	let scrollTimer = null;
	let lastScrollY = 0;
	const page = ref(1);
	const reqParam = {
		cateNo: '1357900003',
		page: page.value,
	};
	const list = computed(() => storeProduct.getList);
	const morePrdouctList = () => {
		const scrollY = window.scrollY;
		const innerHeight = window.innerHeight;
		const scrollPosition = scrollY + innerHeight;
		const bodyHeight = document.body.scrollHeight;

		if (scrollY > lastScrollY) {
			if (scrollPosition >= bodyHeight) {
				if (scrollTimer !== null) {
					clearTimeout(scrollTimer);
				}
				scrollTimer = setTimeout(() => {
					reqParam.page = ++page.value;
					storeProduct.setList(reqParam);

					lastScrollY = scrollY;
				}, 50);
			}
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

<template>
	<main>
		<DisplayHeader title="EVENT" desc="쇼핑몰 이벤트~" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';

	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted, onUnmounted } from 'vue';

	const storeProduct = useStoreProduct();

	let scrollTimer = null;
	let lastScrollY = 0;
	const reqParam = {
		cateNo: '1357900005',
		lastPrdtNo: null,
	};
	const lastPrdtNo = computed(() => storeProduct.getLastPrdtNo);
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
					reqParam.lastPrdtNo = lastPrdtNo.value;
					storeProduct.addList(reqParam);

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

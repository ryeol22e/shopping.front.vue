<template>
	<main>
		<DisplayHeader title="EVENT" desc="쇼핑몰 이벤트~" />
	</main>
</template>

<script setup>
	import DisplayHeader from '@/components/display/DisplayHeader.vue';
	import { usePageLink } from '@/composables/usePageLink';
	import { useStoreProduct } from '@/stores/useStoreProduct';

	const { movePage } = usePageLink();
	const useProduct = useStoreProduct();
</script>

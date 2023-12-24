<template>
	<div class="container-fluid">
		<div class="row">
			<Lnb :list="menuList" />
			<router-view />
		</div>
	</div>
</template>

<script setup>
	import Lnb from '@/components/common/Lnb.vue';

	import { useStoreCommon } from '@/stores/useStoreCommon';
	import { computed, onMounted } from 'vue';

	const useCommon = useStoreCommon();
	const menuList = computed(() => useCommon.getAdminLnb);

	onMounted(() => {
		useCommon.setAdminLnb({
			codeType: '10003',
			codeDepth: '1',
			useYn: 'Y',
		});
	});
</script>

<style scoped></style>

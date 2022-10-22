<template>
	<div class="container-fluid">
		<div class="row">
			<Lnb :list="menuList"/>
			<router-view/>
		</div>
	</div>
</template>

<script setup>
	import {onMounted, computed} from 'vue';
	import Lnb from '@/components/common/Lnb.vue';
	import useStoreCommon from '@/store/useStoreCommon.js';

	const useCommon = useStoreCommon();
	const menuList = computed(()=> useCommon.getAdminLnb);

	onMounted(()=> {
		useCommon.setAdminLnb();
	});
</script>

<style scoped>

</style>
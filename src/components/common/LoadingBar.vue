<template>
	<div v-if="isShow" class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
		<div class="spinner-border" role="status" style="width: 3rem; height: 3rem">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</template>

<script setup>
	import useStoreCommon from '@/store/useStoreCommon';
	import { computed } from 'vue';

	const useCommon = useStoreCommon();
	const isShow = computed(() => useCommon.getIsLoadingShow);
</script>

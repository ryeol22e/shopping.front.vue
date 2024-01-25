<template></template>

<script setup>
	import { useQuasar } from 'quasar';
	import { onMounted, onUnmounted } from 'vue';

	const { loading } = useQuasar();

	onMounted(() => {
		loading.show();
	});
	onUnmounted(() => {
		loading.hide();
	});
</script>

<template>
	<h1>footer...</h1>
</template>

<script setup>
	import { onMounted } from 'vue';
	import useStoreHeader from '@/store/useStoreHeader';

	const useHeader = useStoreHeader();

	onMounted(()=> {
		
	});
</script>
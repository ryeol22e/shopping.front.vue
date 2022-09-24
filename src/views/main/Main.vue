<template>
	<h1>main 입니다!</h1>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import useStoreMain from '@/store/useStoreMain';

	const useMain = useStoreMain();
	
	onMounted(()=> {

	});
		
</script>
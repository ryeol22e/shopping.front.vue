<template>
	<h1>error..</h1>
</template>

<script setup>
	import { onMounted } from 'vue';

	onMounted(() => {
		console.log(history.state.errorType);
	});
</script>

<template>
	<main :style="`height:${sceenHeight}px;`"></main>
	<div class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
		<div class="spinner-border" role="status" style="width: 3rem; height: 3rem">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	const sceenHeight = ref(screen.height);
</script>

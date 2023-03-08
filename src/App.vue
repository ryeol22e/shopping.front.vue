<template>
	<Header />
	<RouterView />
	<Footer />
	<LoadingBar />
</template>

<script setup>
	import { RouterView } from 'vue-router';
	import Header from '@/components/common/Header.vue';
	import Footer from '@/components/common/Footer.vue';
	import LoadingBar from '@/components/common/LoadingBar.vue';
</script>

<template>
	<KeepAlive>
		<Header />
	</KeepAlive>
	<slot />
	<KeepAlive>
		<Footer />
	</KeepAlive>
</template>

<script setup>
	import Header from '@/components/common/Header.vue';
	import Footer from '@/components/common/Footer.vue';
</script>

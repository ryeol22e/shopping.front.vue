<template>
	<Header />
	<RouterView v-slot="{ Component, route }">
		<template v-if="Component">
			<Suspense timeout="0">
				<template #default>
					<component :is="Component" :key="route.fullPath" />
				</template>
				<template #fallback>
					<Loading />
				</template>
			</Suspense>
		</template>
	</RouterView>
	<Footer />
</template>

<script setup>
	import Header from '@/components/common/Header.vue';
	import Footer from '@/components/common/Footer.vue';
	import Loading from '@/components/Loading.vue';
</script>

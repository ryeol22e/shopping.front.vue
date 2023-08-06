<template>
	<RouterView v-slot="{ Component, route }">
		<KeepAlive>
			<Header />
		</KeepAlive>

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

		<KeepAlive>
			<Footer />
		</KeepAlive>
	</RouterView>
</template>

<script setup>
	import Footer from '@/components/common/Footer.vue';
	import Header from '@/components/common/Header.vue';
	import Loading from '@/components/common/Loading.vue';
	import { usePageLink } from '@/composables/usePageLink';
	import { onErrorCaptured } from 'vue';

	const { errorPage } = usePageLink();

	onErrorCaptured((error) => errorPage(404));
</script>

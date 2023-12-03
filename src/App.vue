<template>
	<RouterView v-slot="{ Component, route }">
		<template v-if="Component">
			<KeepAlive>
				<Header />
			</KeepAlive>

			<Suspense timeout="0">
				<template #default>
					<component :is="Component" :key="route.fullPath" />
				</template>
				<template #fallback>
					<Loading />
				</template>
			</Suspense>

			<KeepAlive>
				<Footer />
			</KeepAlive>
		</template>
	</RouterView>
</template>

<script setup>
	import Footer from '@/components/common/Footer.vue';
	import Header from '@/components/common/Header.vue';
	import Loading from '@/components/common/Loading.vue';

	import { usePageLink } from '@/composables/usePageLink';
	import { onErrorCaptured } from 'vue';
	import { useStoreCommon } from './stores/useStoreCommon';

	const { errorPage } = usePageLink();
	const storeCommon = useStoreCommon();

	storeCommon.setHeaders({
		codeType: '10000',
		codeDepth: '1',
		useYn: 'Y',
	});

	onErrorCaptured((error) => errorPage(500));
</script>

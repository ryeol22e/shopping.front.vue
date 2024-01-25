<template>
	<main>
		<q-carousel v-if="bannerList.length > 0" arrows animated infinite v-model="slide" :autoplay="true" transition-prev="slide-right" transition-next="slide-left">
			<q-carousel-slide v-for="(item, index) in bannerList" :key="index" :name="index" :img-src="`data:image/png;base64,${item.image}`">
				<div class="absolute-bottom custom-caption">
					<div class="text-h2">{{ item.title }}</div>
					<div class="text-subtitle1">{{ item.description }}</div>
				</div>
			</q-carousel-slide>
		</q-carousel>

		<div class="q-pa-md row items-start q-gutter-md">
			<q-card v-for="index in 10" :key="index" class="my-card">
				<img src="https://cdn.quasar.dev/img/mountains.jpg" />

				<q-card-section>
					<div class="text-h6">Our Changing Planet</div>
					<div class="text-subtitle2">by John Doe</div>
				</q-card-section>

				<q-card-section class="q-pt-none"> hello </q-card-section>
			</q-card>
		</div>
	</main>
</template>

<script setup>
	import { useUtils } from '@/composables/useUtils';
	import { useStoreMain } from '@/stores/useStoreMain';
	import { ref, computed, onMounted } from 'vue';

	const { isEmpty } = useUtils();
	const useMain = useStoreMain();
	const slide = ref(0);
	const bannerList = computed(() => useMain.getBannerList);

	onMounted(() => {});

	await useMain.setBannerList({
		bannerType: '10000',
		useYn: 'Y',
		dispYn: 'Y',
	});
</script>

<style lang="scss" scoped>
	.custom-caption {
		text-align: center;
		padding: 12px;
		color: white;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.my-card {
		width: 100%;
		max-width: 300px;
	}
</style>

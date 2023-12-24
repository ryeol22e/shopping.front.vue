<template>
	<main>
		<div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
			<div class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
				<div class="my-3 p-3">
					<h2 class="display-5">{{ product.prdtName }}</h2>
					<p class="lead">{{ description }}</p>
				</div>
				<div class="bg-body shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0">
					<img v-if="isEmpty(product.image)" :src="`data:image/png;base64,${product.image}`" :alt="product.prdtName" />
					<svg v-else class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
						<title>Placeholder</title>
						<rect width="100%" height="100%" fill="#55595c" />
						<text x="50%" y="50%" fill="#eceeef" dy=".3em">No Image</text>
					</svg>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
	import { useUtils } from '@/composables/useUtils';
	import { useStoreProduct } from '@/stores/useStoreProduct';
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';

	const { isEmpty } = useUtils();
	const route = useRoute();
	const useProduct = useStoreProduct();
	const product = computed(() => useProduct.getDetail);

	await useProduct.setDetail(route.params.prdtNo);
	onMounted(() => {});
</script>

<style scoped>
	@import url('@/assets/css/product.css');
	.bd-placeholder-img {
		font-size: 1.125rem;
		text-anchor: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	@media (min-width: 768px) {
		.bd-placeholder-img-lg {
			font-size: 3.5rem;
		}
	}

	.b-example-divider {
		height: 3rem;
		background-color: rgba(0, 0, 0, 0.1);
		border: solid rgba(0, 0, 0, 0.15);
		border-width: 1px 0;
		box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
	}

	.b-example-vr {
		flex-shrink: 0;
		width: 1.5rem;
		height: 100vh;
	}

	.bi {
		vertical-align: -0.125em;
		fill: currentColor;
	}

	.nav-scroller {
		position: relative;
		z-index: 2;
		height: 2.75rem;
		overflow-y: hidden;
	}

	.nav-scroller .nav {
		display: flex;
		flex-wrap: nowrap;
		padding-bottom: 1rem;
		margin-top: -1px;
		overflow-x: auto;
		text-align: center;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
	}
</style>

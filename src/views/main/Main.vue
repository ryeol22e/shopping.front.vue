<template>
	<main>
		<div v-if="bannerList.length>0" id="myCarousel" class="carousel slide" data-bs-ride="carousel">
			<div v-if="bannerList.length>1" class="carousel-indicators">
				<button v-for="(item, index) in bannerList" :key="item.bannerId" type="button" :data-bs-target="`#myCarousel`" :data-bs-slide-to="index" class="active" aria-current="true" :aria-label="`Slide ${index}`"></button>
			</div>
			<div class="carousel-inner">
				<div v-if="bannerList.length>0" v-for="(item , index) in bannerList" :key="index" :class="`carousel-item ${index===0 ? 'active' : ''}`">
					<img v-if="!isEmpty(item.image)" :src="`data:image/png;base64,${item.image}`" alt="" class="bd-placeholder-img">
					<svg v-else class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

					<div class="container">
						<div class="carousel-caption text-start">
							<h1>{{item.title}}</h1>
							<p>{{item.description}}</p>
							<!-- <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p> -->
						</div>
					</div>
				</div>
				<div v-else class="carousel-item active">
					<svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
					<div class="container">
						<div class="carousel-caption">
							<h1>WELCOME SHOPPING MALLS.</h1>
							<p></p>
						</div>
					</div>
				</div>
			</div>
			<button v-if="bannerList.length>1" class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button v-if="bannerList.length>1" class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
		<div class="container marketing">
			<!-- Three columns of text below the carousel -->
			<div class="row">
				<div class="col-lg-4">
					<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
					<h2 class="fw-normal">Heading</h2>
					<p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
					<p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
				</div><!-- /.col-lg-4 -->
				<div class="col-lg-4">
					<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
					<h2 class="fw-normal">Heading</h2>
					<p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
					<p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
				</div><!-- /.col-lg-4 -->
				<div class="col-lg-4">
					<svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
					<h2 class="fw-normal">Heading</h2>
					<p>And lastly this, the third column of representative placeholder content.</p>
					<p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
				</div><!-- /.col-lg-4 -->
			</div><!-- /.row -->
		</div>
	</main>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import useStoreMain from '@/store/useStoreMain';
	import {useUtils} from '@/composables/useUtils.js';

	const isEmpty = useUtils().isEmpty;
	const useMain = useStoreMain();
	const bannerList = computed(()=> useMain.getBannerList);

	onMounted(()=> {
		useMain.setBannerList({
			bannerType : '10000',
			useYn : 'Y',
			dispYn : 'Y'
		});
	});
		
</script>

<style scoped>
	@import '@/assets/css/main.css';
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
		background-color: rgba(0, 0, 0, .1);
		border: solid rgba(0, 0, 0, .15);
		border-width: 1px 0;
		box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
	}

	.b-example-vr {
		flex-shrink: 0;
		width: 1.5rem;
		height: 100vh;
	}

	.bi {
		vertical-align: -.125em;
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

	p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* width: 100px; */
		/* height: 20px; */
	}
</style>
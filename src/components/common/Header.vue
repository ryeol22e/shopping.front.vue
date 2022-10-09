<template>
	<main>
		<header class="p-3 text-bg-dark">
			<div class="container">
				<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
						<!-- <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> -->
						<span class="px-3 text-secondary">SHOP</span>
					</router-link>

					<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
						<li v-for="header in headers" :key="header.codeId">
							<router-link :to="header.addInfo2" class="nav-link px-2 text-secondary text-white">
								{{header.codeName}}
							</router-link>
						</li>
					</ul>

					<!-- <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
						<input type="search" class="form-control form-control-dark text-bg-dark" placeholder="검색어를 입력하세요." aria-label="Search">
					</div> -->

					<div class="text-end">
						<router-link to="/login" type="button" class="btn btn-outline-light me-2" v-if="!isLogin">Login</router-link>
						<button type="button" class="btn btn-outline-light me-2" v-else>Logout</button>
						<router-link to="/signup" type="button" class="btn btn-warning me-2" v-if="!isLogin">Sign-up</router-link>
						<router-link to="/admin/dashboard" type="button" class="btn btn-outline-light me-2" v-if="!isLogin">DashBoard</router-link>
					</div>
				</div>
			</div>
		</header>
	</main>
</template>

<script setup>
	import { onMounted, ref, computed } from 'vue';
	import {useRouter} from 'vue-router';
	import useStoreCommon from '@/store/useStoreCommon';
	import useStoreMember from '@/store/useStoreMember';

	const useCommon = useStoreCommon();
	const useMember = useStoreMember();
	const router = useRouter();
	const headers = computed(()=> useCommon.getHeaders);
	const isLogin = computed(()=> useMember.isLogin);
	
	const adminDashBoard = ()=> {
		router.push('/admin/dashboard');
	}
	onMounted(()=> {
		useCommon.setHeaders();
	});
</script>

<style scoped>
	@import '../../assets/css/headers.css';
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
</style>
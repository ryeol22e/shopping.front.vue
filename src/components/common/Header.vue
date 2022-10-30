<template>
	<Mypage :list="myPageList" :isShow="mypageIsShow"/>
	<main>
		<header class="p-3 text-bg-dark">
			<div>
				<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
						<!-- <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> -->
						<h3 class="px-3 text-secondary">SHOP</h3>
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
						<router-link  v-if="!isLogin" to="/login" class="px-2 text-secondary text-white"><span>Login</span></router-link>
						<a v-else @click="mypageOpen" href="javascript:void(0);" class="px-2 text-secondary text-white" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Mypage</a>
						<a class="text-white">·</a>
						<router-link v-if="!isLogin" to="/signup" class="px-2 text-secondary text-white">Sign-up</router-link>
						<a v-else @click="logout" href="javascript:void(0);" class="px-2 text-secondary text-white">Logout</a>
						<router-link v-if="isLogin && roleAdmin==='10003'" to="/admin/dashboard" type="button" class="btn btn-outline-light me-2">관리자</router-link>
					</div>
				</div>
			</div>
		</header>
	</main>
</template>

<script setup>
	import Mypage from '@/components/common/Mypage.vue';
	import { onMounted, computed, watchEffect, ref } from 'vue';
	import useStoreCommon from '@/store/useStoreCommon';
	import useStoreMember from '@/store/useStoreMember';
	import {useUtilCookie} from '@/composables/useUtils';

	const useCommon = useStoreCommon();
	const useMember = useStoreMember();
	const useCookie = useUtilCookie();
	const headers = computed(()=> useCommon.getHeaders);
	const isLogin = computed(()=> useMember.getIsLogin);
	const roleAdmin = computed(()=> useMember.getUserRole);
	const myPageList = ref([]);
	const mypageIsShow = ref(false);
	const logout = ()=> {
		useCookie.deleteCookie('token');
		sessionStorage.removeItem('userInfo');
		useMember.setLogin(false);
	};
	const mypageOpen = async ()=> {
		useCommon.setMypageList();
		myPageList.value = await useCommon.getMypage;
		mypageIsShow.value = true;
	};
	onMounted(()=> {
		useCommon.setHeaders();
	});
	watchEffect(()=> {
		roleAdmin.value;
	});

</script>

<style scoped>
	@import '@/assets/css/headers.css';

	a {
		text-decoration: none;
	}
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
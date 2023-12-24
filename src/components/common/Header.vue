<template>
	<Mypage :isShow="mypageIsShow" />
	<main class="sticky-top">
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<div class="container-fluid">
				<RouterLink to="/" class="navbar-brand">
					<!-- <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> -->
					<h3 class="px-3 text-secondary">SHOP</h3>
				</RouterLink>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-item-div" aria-controls="nav-item-div" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="nav-item-div">
					<ul class="navbar-nav me-auto col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
						<li v-for="header in headers" :key="header.codeId" @click="closeHeader" class="nav-item">
							<RouterLink :to="{ path: header.addInfo2, query: { page: 1 } }" class="nav-link px-2 text-secondary text-white">
								{{ header.codeName }}
							</RouterLink>
						</li>
						<li v-if="userRole === MEMBER_CONST.VIP || userRole === MEMBER_CONST.ADMIN" class="nav-item">
							<RouterLink to="/display/vip" class="nav-link px-2 text-secondary text-white"> VIP </RouterLink>
						</li>
					</ul>

					<div :class="isMobile ? '' : 'text-end'">
						<RouterLink v-if="!isLogin" to="/login" @click="closeHeader" class="px-2 text-secondary text-white"><span>Login</span></RouterLink>
						<a v-else @click="mypageOpen" href="javascript:void(0);" class="px-2 text-secondary text-white" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Mypage</a>
						<a class="text-white">·</a>
						<RouterLink v-if="!isLogin" to="/signup" @click="closeHeader" class="px-2 text-secondary text-white">Sign-up</RouterLink>
						<a v-else @click="logout" href="javascript:void(0);" class="px-2 text-secondary text-white">Logout</a>
						<RouterLink v-if="isLogin && userRole === MEMBER_CONST.ADMIN" to="/admin/dashboard" @click="closeHeader" type="button" class="btn btn-outline-light me-2">관리자</RouterLink>
					</div>
				</div>
				<!-- <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
						<input type="search" class="form-control form-control-dark text-bg-dark" placeholder="검색어를 입력하세요." aria-label="Search">
					</div> -->
			</div>
		</nav>
	</main>
</template>

<script setup>
	import Mypage from '@/components/common/Mypage.vue';

	import { useDeviceManager } from '@/composables/useDeviceManager';
	import { useEnum } from '@/composables/useEnum';
	import { useLoginManager } from '@/composables/useLoginManager';
	import { useStoreCommon } from '@/stores/useStoreCommon';
	import { useStoreMember } from '@/stores/useStoreMember';
	import { computed, ref } from 'vue';
	import { RouterLink } from 'vue-router';

	const { isLogin, userRole } = useLoginManager();
	const { MEMBER_CONST } = useEnum();
	const { isMobile } = useDeviceManager();
	const storeCommon = useStoreCommon();
	const useMember = useStoreMember();

	const mypageIsShow = ref(false);
	const headers = computed(() => storeCommon.getHeaders);

	const checkMobileHeader = () => {
		if (isMobile.value) {
			if (document.getElementById('nav-item-div').classList.contains('show')) {
				document.getElementById('nav-item-div').classList.remove('show');
			}
		}
	};
	const logout = async () => {
		await useMember.logoutProcess();
		checkMobileHeader();
	};
	const closeHeader = () => checkMobileHeader();
	const mypageOpen = async () => {
		await storeCommon.setMypageList();
		mypageIsShow.value = true;
		checkMobileHeader();
	};
</script>

<style scoped>
	@import '@/assets/css/headers.css';
	@import '@/assets/css/navbar.css';

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

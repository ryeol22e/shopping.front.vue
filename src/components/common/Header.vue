<template>
	<Mypage :isShow="mypageIsShow" />

	<q-header elevated reveal class="bg-black">
		<q-toolbar class="glossy">
			<!-- <q-avatar>
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
				</q-avatar> -->

			<RouterLink to="/" class="text-white">
				<q-toolbar-title>SHOP</q-toolbar-title>
			</RouterLink>
			<q-btn v-if="isMobile" flat round dense icon="menu" class="q-mr-sm" />
		</q-toolbar>
		<q-toolbar insert>
			<q-breadcrumbs active-color="primary" style="font-size: 16px">
				<RouterLink class="text-white" v-for="header in headers" :key="header.codeId" :to="{ path: header.addInfo2 }">
					<q-breadcrumbs-el :label="header.codeName" />
				</RouterLink>
				<RouterLink v-if="userRole === MEMBER_CONST.VIP || userRole === MEMBER_CONST.ADMIN" to="/display/vip" class="text-white">
					<q-breadcrumbs-el label="VIP" />
				</RouterLink>

				<div class="absolute-right">
					<RouterLink v-if="!isLogin" to="/login" class="text-white">
						<q-breadcrumbs-el label="Login" />
					</RouterLink>
					<a v-else @click="mypageOpen" href="javascript:void(0);" class="text-white" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Mypage</a>

					<a class="text-white">·</a>

					<RouterLink v-if="!isLogin" to="/signup" class="text-white">
						<q-breadcrumbs-el label="Sign-up" />
					</RouterLink>
					<template v-else>
						<template v-if="userRole === MEMBER_CONST.ADMIN">
							<RouterLink to="/admin/dashboard" class="text-white">
								<q-breadcrumbs-el label="admin" />
							</RouterLink>

							<a class="text-white">·</a>
						</template>
						<a @click="logout" href="javascript:void(0);" class="text-white">
							<q-breadcrumbs-el label="Logout" />
						</a>
					</template>
				</div>
			</q-breadcrumbs>
		</q-toolbar>
	</q-header>
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

	const logout = async () => {
		await useMember.logoutProcess();
	};
	const mypageOpen = async () => {
		await storeCommon.setMypageList().then(() => {
			mypageIsShow.value = true;
		});
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

<template>
	<main class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<form @submit.prevent="loginProcess" id="loginForm">
			<div class="form-floating">
				<input type="text" class="form-control" placeholder="ID" name="memberId" v-model="data.memberId" />
				<label for="floatingInput">ID</label>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" placeholder="Password" name="memberPassword" v-model="data.memberPassword" />
				<label for="floatingPassword">Password</label>
			</div>

			<div class="checkbox mb-3">
				<label> <input type="checkbox" value="remember-me" v-model="remember" /> Remember me </label>
			</div>
			<button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
		</form>
	</main>
</template>

<script setup>
	import { usePageLink } from '@/composables/usePageLink';
	import { useUtils } from '@/composables/useUtils';
	import { useStoreMember } from '@/stores/useStoreMember';
	import { computed, onMounted, reactive, ref } from 'vue';

	const { movePage, reloadPage } = usePageLink();
	const { isEmpty } = useUtils();
	const storeMember = useStoreMember();
	const memberId = decodeURIComponent(localStorage.getItem('memberId'));
	const remember = ref(isEmpty(memberId) ? false : true);
	const isLogin = computed(() => storeMember.isLogin);
	const data = reactive({
		memberId: remember ? memberId : '',
		memberPassword: '',
	});
	const loginProcess = async () => {
		if (validate()) {
			await storeMember.loginProcess(new FormData(document.getElementById('loginForm'))).then(() => {
				if (isLogin.value) {
					if (remember) {
						localStorage.setItem('memberId', encodeURIComponent(data.memberId));
					}

					location.href = '/';
				} else {
					alert('로그인에 실패했습니다.');
					reloadPage();
				}
			});
		}
	};
	const validate = () => {
		if (data.memberId === '') {
			alert('아이디를 입력해주세요.');
			return false;
		}
		if (data.memberPassword === '') {
			alert('비밀번호를 입력해주세요.');
			return false;
		}

		return true;
	};

	onMounted(() => {
		if (isLogin.value) {
			movePage('/');
		}
	});
</script>

<style scoped>
	@import '@/assets/css/signin.css';
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

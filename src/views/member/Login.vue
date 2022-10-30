<template>
	<main class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<div class="form-floating">
			<input type="email" class="form-control" placeholder="ID" v-model="data.memberId">
			<label for="floatingInput">ID</label>
		</div>
		<div class="form-floating">
			<input type="password" class="form-control" placeholder="Password" v-model="data.memberPassword" @keyup.enter="loginProcess">
			<label for="floatingPassword">Password</label>
		</div>

		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me" v-model="remember"> Remember me
			</label>
		</div>
		<button class="w-100 btn btn-lg btn-primary" type="button" @click="loginProcess">Sign in</button>
		<p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
	</main>
</template>

<script setup>
	import {ref, reactive, onMounted, computed} from 'vue';
	import {useRouter} from 'vue-router';
	import useStoreMember from '@/store/useStoreMember';
	import {useUtilCookie} from '@/composables/useUtils';

	const useCookie = useUtilCookie();
	const useMember = useStoreMember();
	const router = useRouter();
	const memberId = localStorage.getItem('memberId');
	const remember = ref(memberId==='' ? false : true);
	const data = reactive({
		memberId : remember ? memberId : '',
		memberPassword : '',
	});
	
	const loginProcess = async ()=> {
		if(validate()) {
			useMember.loginProcess(data);
			const userInfo = await useMember.getUserInfo;
			const token = userInfo?.accessToken || '';
			
			if(token!=='') {
				if(remember) {
					localStorage.setItem('memberId', userInfo.memberId);
				}

				sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
				useCookie.setCookie('token', token);
				useMember.setLogin(true);
				router.push('/');
			} else {
				alert('로그인에 실패했습니다.');
			}
		}
	};
	const validate = ()=> {
		if(data.memberId==='') {
			alert('아이디를 입력해주세요.');
			return false;
		}
		if(data.memberPassword==='') {
			alert('비밀번호를 입력해주세요.');
			return false;
		}

		return true;
	}

	onMounted(()=> {
		
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
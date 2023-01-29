import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode})=> {
	const env = loadEnv(mode, process.cwd(), '');
	const profile = env.NODE_ENV;
	console.log(profile);
	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		server : {
			port : env.VITE_APP_PORT,
			host : true,
			origin : `http://${profile==='prod' ? 'www' : profile}.shoppingmall.com:7800`,
		}
	
	}
})

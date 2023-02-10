import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({command, mode})=> {
	const env = loadEnv(mode, process.cwd(), '');
	const active = env.NODE_ENV;
	const config = {
		plugins: [vue(), basicSsl()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		server : {
			origin : `${active==='prod' ? 'www' : active}.shoppingmall.com:7800`,
			port : env.VITE_APP_PORT,
			host : true,
		},
		https : true,
	
	}

	return config
})

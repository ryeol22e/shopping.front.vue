import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig(({command, mode})=> {
	const env = loadEnv(mode, process.cwd(), '');
	const active = env.NODE_ENV;
	const config = {
		plugins: [vue()],
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
	}

	if(active==='development') {
		config.server.https = {}
		config.server.https.pfx = fs.readFileSync('./src/assets/file/ssl/shoppingmall.p12')
		config.server.https.passphrase = 'shoppingmall1234'
	}

	return config
})

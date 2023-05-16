import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const active = env.VITE_PROFILE_ACTIVE;
	const config = {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		server: {
			// origin: `${active === 'prod' ? 'www' : active}.shoppingmall.com:7800`,
			port: env.VITE_APP_PORT,
			host: true,
		},
	};

	if (active === 'local') {
		config.server.https = {
			pfx: fs.readFileSync('./src/assets/file/ssl/shoppingmall.p12'),
			passphrase: 'shoppingmall1234',
		};
	}

	return config;
});

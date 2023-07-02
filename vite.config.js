import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

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
			port: env.VITE_APP_PORT,
			host: true,
			fs: {
				allow: ['.'],
				deny: ['.env', '.env.*', '/assets/file/**'],
			},
		},
	};

	if (active === 'local') {
		config.server.https = {
			pfx: fs.readFileSync('./src/assets/file/ssl/shoppingmall.p12'),
			passphrase: 'shoppingmall1234',
			timeout: 1000,
		};
	}

	return config;
});

import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, `${process.cwd()}/env`, '');
	const active = env.VITE_PROFILE_ACTIVE;
	const config = {
		envDir: './env',
		plugins: [
			vue({
				template: { transformAssetUrls },
			}),
			quasar({
				sassVariables: './src/assets/sass/quasar-variables.sass',
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		logLevel: 'info',
		server: {
			port: env.VITE_APP_PORT,
			host: true,
			fs: {
				allow: ['.'],
				deny: ['.env', '.env.*', '/assets/file/**'],
			},
			proxy: {
				'/api': {
					target: env.VITE_API_BASE_URL,
					changeOrigin: true,
				},
			},
		},
		build: {
			emptyOutDir: true,
			assetsDir: 'assets',
			target: 'modules',
			cssTarget: 'chrome61',
			minify: 'esbuild',
			cssMinify: 'esbuild',
			ssr: false,
			rollupOptions: {
				output: {
					entryFileNames: '[name].js',
					chunkFileNames: 'assets/[hash].js',
					assetFileNames: 'css/[hash].[ext]',
				},
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

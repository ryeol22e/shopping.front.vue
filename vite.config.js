import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, `${process.cwd()}/env`, '');
	const active = env.VITE_PROFILE_ACTIVE;
	console.log(command);
	const config = {
		envDir: './env',
		plugins: [vue()],
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

// const prerender = async () => {
// 	const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 	const toAbsolute = (p) => path.resolve(__dirname, p);

// 	const manifest = JSON.parse(fs.readFileSync(toAbsolute('dist/static/.vite/ssr-manifest.json'), 'utf-8'));
// 	const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
// 	const { render } = await import('./dist/server/entry-server.js');

// 	// determine routes to pre-render from src/pages
// 	const routesToPrerender = fs.readdirSync(toAbsolute('src/pages')).map((file) => {
// 		const name = file.replace(/\.vue$/, '').toLowerCase();
// 		return name === 'home' ? `/` : `/${name}`;
// 	});

// 	(async () => {
// 		// pre-render each route...
// 		for (const url of routesToPrerender) {
// 			const [appHtml, preloadLinks] = await render(url, manifest);

// 			const html = template.replace(`<!--preload-links-->`, preloadLinks).replace(`<!--app-html-->`, appHtml);

// 			const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
// 			fs.writeFileSync(toAbsolute(filePath), html);
// 			console.log('pre-rendered:', filePath);
// 		}

// 		// done, delete .vite directory including ssr manifest
// 		fs.rmSync(toAbsolute('dist/static/.vite'), { recursive: true });
// 	})();
// };

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		svgr({ exportAsDefault: true }), // SVG лоадер
		react(),
		tsconfigPaths(), // TS пути
	],
	resolve: {
		alias: [
			// { find: '@', replacement: '/src' },
		],
	},
	define: { // переменные окружения (buildPlugins.ts)
		_IS_DEV: JSON.stringify(true),
		_API: JSON.stringify('http://localhost:8000'),
		_PROJECT: JSON.stringify('frontend'),
	},
});

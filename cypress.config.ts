import { devServer } from '@cypress/vite-dev-server';
import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: 'http://localhost:3000/',
	},

	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
		},
	},

	// component: {
	// 	async devServer(devServerConfig) {
	// 		return await devServer({
	// 			...devServerConfig,
	// 			framework: 'react',
	// 			viteConfig: require('./vite.config.ts'),
	// 		});
	// 	},
	// },
});

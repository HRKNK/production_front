import { type BuildPaths } from '../build/types/config';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import path from 'path';

import type webpack from 'webpack';

function loaders (options: boolean) {
	return {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			options ? 'style-loader' : MiniCssExtractPlugin.loader, // OR "style-loader",
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				options: {
				// modules: true, // поддержка модулей ('./Counter.module.scss') and use (global.d.ts)
					modules: {
						auto: /\.module\.s[ac]ss$/i, // для каких файлов действует правило module
						localIdentName: options ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]', // генерация имени стилей
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	};
}

export default ({ config }: { config: webpack.Configuration, }) => {
	const paths: BuildPaths = {
		build: '',
		html: '',
		entry: '',
		src: path.resolve(__dirname, '..', '..', 'src'),
	};
	config.resolve.modules.push(paths.src);
	config.resolve.extensions.push('.tsx', '.ts');
	config.module.rules.push(loaders(true));
	return config;
};

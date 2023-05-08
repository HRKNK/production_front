/* eslint-disable @typescript-eslint/naming-convention */
import { type BuildOptions } from './types/config';

// import { buildBabelLoader } from './loaders/buildBabelLoader';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type webpack from 'webpack';

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] { // специальный TS тип для лоадеров|правил
	// const jts_BabelLoader = buildBabelLoader({ ...options, isTSX: false });
	// const jtsx_BabelLoader = buildBabelLoader({ ...options, isTSX: true });

	const typescriptLoaders = {
		test: /\.tsx?$/,
		loader: 'ts-loader',
		exclude: /node_modules/, // исключение
	};

	const babelLoader = {
		test: /\.[jt]?sx?$/, // /\.m?js$/
		exclude: /node_modules/, // исключение
		use: {
			loader: 'babel-loader',
			options: {
				cacheDirectory: true, // кэширование
				presets: ['@babel/preset-env'],
				plugins: [
					options.isDev && require.resolve('react-refresh/babel'), // !isDev вернет false
				].filter(Boolean), // избавляемся от false
			},
		},
	};

	const scssLoader = {
		exclude: /node_modules/, // исключение
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // OR "style-loader",
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				options: {
				// modules: true, // поддержка модулей ('./Counter.module.scss') and use (global.d.ts)
					modules: {
						auto: /\.module\.s[ac]ss$/i, // для каких файлов действует правило module
						localIdentName: options.isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]', // генерация имени стилей
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	};

	const svgLoader = {
		exclude: /node_modules/, // исключение
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const fileLoader = {
		exclude: /node_modules/, // исключение
		test: /\.(png|jpe?g|gif)$/i, // можно докинуть свои расширения типа шрифтов
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	return [fileLoader, svgLoader, babelLoader, typescriptLoaders, scssLoader]; // создание порядка возвращаемых лоадеров (выполняются в обратном порядке?) // https://webpack.js.org/concepts/loaders/
}

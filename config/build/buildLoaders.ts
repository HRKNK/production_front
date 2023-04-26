/* eslint-disable @typescript-eslint/naming-convention */
import { type BuildOptions } from './types/config';

import { buildBabelLoader } from './loaders/buildBabelLoader';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type webpack from 'webpack';

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] { // специальный TS тип для лоадеров|правил
	// const jts_BabelLoader = buildBabelLoader({ ...options, isTSX: false });
	// const jtsx_BabelLoader = buildBabelLoader({ ...options, isTSX: true });

	const typescriptLoaders = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/, // исключение
	};

	const babelLoader = {
		test: /\.[jt]?sx?$/, // /\.m?js$/
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [ // для плагина i18n
					['i18next-extract', {
						locales: ['ru', 'en'],
						keyAsDefaultValue: true,
					}],
					options.isDev && require.resolve('react-refresh/babel'), // !isDev вернет false
				].filter(Boolean), // избавляемся от false
			},
		},
	};

	const scssLoader = {
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
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const fileLoader = {
		test: /\.(png|jpe?g|gif)$/i, // можно докинуть свои расширения типа шрифтов
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	return [fileLoader, svgLoader, babelLoader, typescriptLoaders, scssLoader]; // создание порядка возвращаемых лоадеров (выполняются в обратном порядке?) // https://webpack.js.org/concepts/loaders/
}

import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[]  { // специальный TS тип для лоадеров

	const typescriptLoaders = {	
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/, // исключение
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
		  // Creates `style` nodes from JS strings
		  options.isDev ? "style-loader" : MiniCssExtractPlugin.loader, // OR "style-loader",
		  // Translates CSS into CommonJS
		  {
			loader : "css-loader",
			options: {
				// modules: true, // поддержка модулей ('./Counter.module.scss') and use (global.d.ts)
				modules: {
					auto: /\.module\.s[ac]ss$/i, // для каких файлов действует правило module
					localIdentName: options.isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]', // генерация имени стилей					
				}
			},
		  },
		  // Compiles Sass to CSS
		  "sass-loader",
		],
	}

	return [ typescriptLoaders, scssLoader ] // создание порядка возвращаемых лоадеров
}
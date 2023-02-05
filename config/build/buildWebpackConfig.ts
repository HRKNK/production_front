import webpack from "webpack";

import { BuildOptions } from "./types/config";

import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

	const {mode, paths, isDev} = options;

	return { // TS type from webpack
		module: { // TS // Обработка расширений файла
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),

		devServer: buildDevServer(options),
		devtool: isDev ? 'inline-source-map' : undefined, // карта исходного кода / поиск ошибки в коде

		mode: mode, // development | production
		entry: { // входная точка приложения
			bundle: paths.entry,
		},
		output: { // куда собрать приложение
			filename: '[name].[contenthash].js', // шаблон динамического имени entry[name].[hash] 
			path: paths.build,
			clean: true, // подчищает папку build
		},
		plugins: buildPlugins(options),
	}
};
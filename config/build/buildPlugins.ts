import { type BuildOptions } from './types/config';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins ({ paths, isDev, apiUrl, project }: BuildOptions): webpack.WebpackPluginInstance[] { // специальный TS тип для плагинов
	const plugins = [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: paths.html }), // файл используется как шаблон (куда подключать сборку/файлы)
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new webpack.DefinePlugin({ // переменные окружения
			_IS_DEV: JSON.stringify(isDev),
			_API: JSON.stringify(apiUrl),
			_PROJECT: JSON.stringify(project),
		}),
		new CopyPlugin({ // Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
			patterns: [
				{ from: paths.locales, to: paths.buildLocales }, // откуда / куда
			],
		}),
	];

	if (isDev) {
		plugins.push(new webpack.HotModuleReplacementPlugin()); // апдейты изменений без перезагрузок страницы
		plugins.push(new ReactRefreshWebpackPlugin()); // апдейты для реакт компонентов
		plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: false, // открытие вкладки статистики (ссылка дублируется в консоль)
		}));
	}

	return plugins;
}

import { type BuildOptions } from './types/config';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

export function buildPlugins ({ paths, isDev, apiUrl, project }: BuildOptions): webpack.WebpackPluginInstance[] { // специальный TS тип для плагинов
	const plugins = [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: paths.html }), // файл используется как шаблон (куда подключать сборку/файлы)
		new webpack.DefinePlugin({ // переменные окружения
			_IS_DEV: JSON.stringify(isDev),
			_API: JSON.stringify(apiUrl),
			_PROJECT: JSON.stringify(project),
		}),
		new CircularDependencyPlugin({ // Циркулярная/Кольцевая зависимость
			exclude: /node_modules/, // RegExp
			failOnError: true, // пробросить ошибку при наличии кольцевых зависимостях
		}),
	];

	// Оптимизация сборки:

	if (isDev) { // докинуть плагины в дэв сборку
		plugins.push(new webpack.HotModuleReplacementPlugin()); // апдейты изменений без перезагрузок страницы
		plugins.push(new ReactRefreshWebpackPlugin()); // апдейты для реакт компонентов
		plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: false, // открытие вкладки статистики (ссылка дублируется в консоль)
		}));
	}

	if (!isDev) { // докинуть плагины в прод сборку
		plugins.push(
			new CopyPlugin({ // Копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки.
				patterns: [
					{ from: paths.locales, to: paths.buildLocales }, // откуда / куда
				],
			}),
		);
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
		);
	}

	return plugins;
}

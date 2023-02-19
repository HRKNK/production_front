import { type BuildOptions } from './types/config';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { ReactRefreshPlugin } from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins ({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] { // специальный TS тип для плагинов
	return [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: paths.html }), // файл используется как шаблон (куда подключать сборку/файлы)
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
		new webpack.DefinePlugin({
			_IS_DEV: JSON.stringify(isDev),
		}),
		new webpack.HotModuleReplacementPlugin(), // апдейты изменений без перезагрузок страницы
		// new ReactRefreshPlugin(), // апдейты для реакт компонентов
		new BundleAnalyzerPlugin({
			openAnalyzer: false, // открытие вкладки статистики (ссылка дублируется в консоль)
		}), // анализ бандла
	];
}

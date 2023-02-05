import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { BuildOptions } from './types/config';

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] { // специальный TS тип для плагинов
	return [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: paths.html}), // файл используется как шаблон
		new MiniCssExtractPlugin({ 
									filename: 'css/[name].[contenthash:8].css', 
									chunkFilename: 'css/[name].[contenthash:8].css' 
								}),
	]
}
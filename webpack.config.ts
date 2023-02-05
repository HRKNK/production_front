// https://webpack.js.org/guides/getting-started/#basic-setup
// https://webpack.js.org/configuration/configuration-languages/#typescript
// https://webpack.js.org/guides/development/

// https://webpack.js.org/guides/environment-variables/ // ENV окружение

// https://webpack.js.org/loaders/sass-loader/
// npm install sass-loader sass webpack style-loader css-loader --save-dev // sass лоадер

// https://webpack.js.org/plugins/mini-css-extract-plugin // плагин для сборки цсс файла
// npm install --save-dev mini-css-extract-plugin

// npm i webpack webpack-cli --save-dev // cредство, используемое для запуска webpack в командной строке
// npm i html-webpack-plugin --save-dev
// npm i --save-dev webpack-dev-server @types/webpack-dev-server

// TYPESCRIPT
// npm i --save-dev typescript ts-node @types/node @types/webpack
// npm i --save-dev typescript ts-loader

// npx webpack | webpack  if(-g)

// import path from 'path'; // для пакетов ноды  * as | изменить конфиг TS [esModuleInterop, allowSyntheticDefaultImports]
// import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpack from 'webpack';
import path from 'path';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';


export default (env: BuildEnv) => {

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
	}
	
	const mode = env.mode || 'development';
	const PORT = env.port || 3000;

	const isDev = mode === 'development'; // true or false
	
	const config: webpack.Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
	});

	return config;
};
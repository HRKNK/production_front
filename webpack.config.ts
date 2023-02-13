// https://webpack.js.org/guides/getting-started/#basic-setup
// https://webpack.js.org/configuration/configuration-languages/#typescript
// https://webpack.js.org/guides/development/

// https://webpack.js.org/guides/environment-variables/ // ENV окружение

// https://webpack.js.org/loaders/sass-loader/
// npm install sass-loader sass webpack style-loader css-loader --save-dev // sass loader

// https://www.npmjs.com/package/@svgr/webpack
// npm install @svgr/webpack --save-dev // SVG loader

// https://v4.webpack.js.org/loaders/file-loader/
// npm install file-loader --save-dev // FILE loader

// https://webpack.js.org/plugins/define-plugin/ // глобальные переменные (дополнительно закинуть в декларации);

// https://webpack.js.org/plugins/mini-css-extract-plugin // плагин для сборки цсс файла
// npm install --save-dev mini-css-extract-plugin

// https://eslint.org/docs/latest/use/getting-started // Линтер (правила для код стайла)
// npm install --save-dev eslint + npm init @eslint/config

// npm i webpack webpack-cli --save-dev // cli cредство, используемое для запуска webpack в командной строке
// npm i html-webpack-plugin --save-dev // связывание сборки с html шаблоном
// npm i --save-dev webpack-dev-server @types/webpack-dev-server // реалтайм сервер изменений

// TYPESCRIPT // https://webpack.js.org/guides/typescript/ // не забывать сменить расширение на .ts
// npm i --save-dev typescript ts-node @types/node @types/webpack
// npm i --save-dev typescript ts-loader

// npx webpack | webpack  if(-g)

// import path from 'path'; // для пакетов ноды  * as | изменить конфиг TS [esModuleInterop, allowSyntheticDefaultImports]

import { buildWebpackConfig } from './config/build/buildWebpackConfig';

import { type BuildEnv, type BuildPaths } from './config/build/types/config';

import path from 'path';

import type webpack from 'webpack';

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'build'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
	};

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

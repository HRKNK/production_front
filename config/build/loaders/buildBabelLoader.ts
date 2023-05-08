import { type BuildOptions } from '../types/config';
import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';

interface BuildBabelLoaderProps extends BuildOptions {
	isTSX?: boolean;
}

export function buildBabelLoader ({ isDev, isTSX }: BuildBabelLoaderProps) {
	return {
		test: isTSX ? /\.[jt]?sx$/ : /\.[jt]?s$/, // .tsx or .ts /\.[jt]?sx?$/
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				cacheDirectory: true, // кэширование
				presets: ['@babel/preset-env'],
				plugins: [
					['@babel/plugin-transform-typescript', {
						isTSX, // TRUE = .tsx
					}],
					'@babel/plugin-transform-runtime',
					isTSX && !isDev && [ // плагин запускается только для TSX файлов и прод сборки
						babelRemovePropsPlugin,
						{
							props: ['data-testid'],
						},
					],
					isDev && require.resolve('react-refresh/babel'), // !isDev вернет false
				].filter(Boolean), // избавляемся от false
			},
		},
	};
}

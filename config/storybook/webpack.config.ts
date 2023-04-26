import { type BuildPaths } from '../build/types/config';

import { DefinePlugin, type RuleSetRule } from 'webpack';

import path from 'path';

import type webpack from 'webpack';

const cssLoaders = () => {
	return {
		test: /\.s[ac]ss$/i,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: { // modules: true, // поддержка модулей ('./Counter.module.scss') and use (global.d.ts)
					modules: {
						auto: /\.module\.s[ac]ss$/i, // для каких файлов действует правило module
						localIdentName: '[path][name]__[local]--[hash:base64:5]', // генерация имени стилей
					},
				},
			},
			'sass-loader',
		],
	};
};

export default ({ config }: { config: webpack.Configuration, }) => {
	const paths: BuildPaths = {
		build: '',
		html: '',
		entry: '',
		src: path.resolve(__dirname, '..', '..', 'src'),
		locales: '',
		buildLocales: '',
	};
	config.resolve.modules.unshift(paths.src);
	config.resolve.extensions.push('.tsx', '.ts');

	config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
		// eslint-disable-next-line @typescript-eslint/prefer-includes
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg/i };
		}
		return rule;
	});

	config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
	config.module.rules.push(cssLoaders());
	config.plugins.push(new DefinePlugin({
		_IS_DEV: true,
		_API: JSON.stringify('https://testapi.ru'),
		_PROJECT: JSON.stringify('storybook'),
	}));

	return config;
};

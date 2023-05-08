module.exports = {
	stories: [
		'../../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		{
			name: '@storybook/addon-essentials',
			options: {
				backgrounds: false, // отключает стоковый аддон тем
			},
		},
		'@storybook/addon-interactions',
		'storybook-addon-themes',
		'storybook-addon-mock',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
};

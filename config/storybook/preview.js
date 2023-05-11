import { addDecorator } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { routeDecorator } from 'shared/config/storybook/routeDecorator';
import { styleDecorator } from 'shared/config/storybook/styleDecorator';
import { suspenseDecorator } from 'shared/config/storybook/suspenseDecorator';
import { translationDecorator } from 'shared/config/storybook/translationDecorator';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	layout: 'fullscreen',
	themes: {
		default: 'green',
		list: [
			{ name: 'dark', class: ['app', Theme.DARK], color: '#000' }, // color - цвет интерфейса сторибука
			{ name: 'green', class: ['app', Theme.GREEN], color: '#4caf50' },
			{ name: 'light', class: ['app', Theme.LIGHT], color: '#fff' },
		],
	},
};

// декораторы или (дефолтное применение к сторибуку)
addDecorator(routeDecorator);
addDecorator(styleDecorator);
// addDecorator(themeDecorator(Theme.DARK)); // включен аддон тем
addDecorator(translationDecorator);
addDecorator(suspenseDecorator);

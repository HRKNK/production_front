import { styleDecorator } from '../../src/shared/config/storybook/styleDecorator';
import { themeDecorator } from '../../src/shared/config/storybook/themeDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider/public';
import { routeDecorator } from '../../src/shared/config/storybook/routeDecorator';
import { translationDecorator } from '../../src/shared/config/storybook/translationDecorator';

import { addDecorator } from '@storybook/react';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

// декораторы или (дефолтное применение к сторибуку)
addDecorator(routeDecorator);
addDecorator(styleDecorator);
addDecorator(themeDecorator(Theme.DARK));
addDecorator(translationDecorator);

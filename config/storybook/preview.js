import { styleDecorator } from 'shared/config/storybook/styleDecorator';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';
import { routeDecorator } from 'shared/config/storybook/routeDecorator';
import { translationDecorator } from 'shared/config/storybook/translationDecorator';
import { suspenseDecorator } from 'shared/config/storybook/SuspenseDecorator';

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
addDecorator(suspenseDecorator);

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import ErrorBoundary from './PageErrorBoundary';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Widgets/ErrorBoundary',
	component: ErrorBoundary,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ErrorBoundary>;

const Template: ComponentStory<typeof ErrorBoundary> = (args) => <ErrorBoundary {...args} />;
export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
	// применение отдельной темы
	themeDecorator(Theme.LIGHT),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [themeDecorator(Theme.DARK)];

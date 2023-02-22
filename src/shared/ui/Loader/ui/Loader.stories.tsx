import Loader from './Loader';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Shared/Loader',
	component: Loader,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader />;

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	themeDecorator(Theme.DARK),
];

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
	themeDecorator(Theme.LIGHT),
];

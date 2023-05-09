import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import ThemeSwitcher from './ThemeSwitcher';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Shared/ThemeSwitcher',
	component: ThemeSwitcher,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />;

export const Dark = Template.bind({});
Dark.args = {
	children: 'More word',
};
Dark.decorators = [themeDecorator(Theme.DARK)];

export const Light = Template.bind({});
Light.args = {
	children: 'More word',
};
Light.decorators = [themeDecorator(Theme.LIGHT)];

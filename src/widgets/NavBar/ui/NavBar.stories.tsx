import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import NavBar from './NavBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Widgets/NavBar',
	component: NavBar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;
export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
	// применение отдельной темы
	themeDecorator(Theme.LIGHT),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [themeDecorator(Theme.DARK)];

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import SideBar from './SideBar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Widgets/SideBar',
	component: SideBar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
	// применение отдельной темы
	themeDecorator(Theme.LIGHT),
	StoreDecorator({
		user: { authData: {} },
	}),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	themeDecorator(Theme.DARK),
	StoreDecorator({
		user: { authData: {} },
	}),
];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
	StoreDecorator({
		user: {},
	}),
];

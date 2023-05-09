import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import MainPage from './MainPage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Pages/MainPage',
	component: MainPage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		// для обязательных пропсов
		to: '/',
	},
	decorators: [StoreDecorator({})],
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
Secondary.decorators = [
	// применение отдельной темы
	themeDecorator(Theme.LIGHT),
];

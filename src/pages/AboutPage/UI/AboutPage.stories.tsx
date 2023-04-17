import AboutPage from './AboutPage';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Pages/AboutPage',
	component: AboutPage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: { // для обязательных пропсов
		to: '/',
	},
	decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage/>;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {};
Secondary.decorators = [ // применение отдельной темы
	themeDecorator(Theme.LIGHT),
];

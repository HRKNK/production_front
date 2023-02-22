import Button, { ThemeButton } from './Button';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Shared/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'More word',
};
Primary.decorators = [ // применение отдельной темы
	themeDecorator(Theme.LIGHT),
];

export const Clear = Template.bind({});
Clear.args = {
	children: 'More word',
	theme: ThemeButton.CLEAR,
};
Clear.decorators = [
	themeDecorator(Theme.LIGHT),
];

export const Outline = Template.bind({});
Outline.args = {
	children: 'More word',
	theme: ThemeButton.OUTLINE,
};

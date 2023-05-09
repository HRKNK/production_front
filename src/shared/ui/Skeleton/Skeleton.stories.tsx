import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import { Skeleton } from './Skeleton';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/Skeleton',
	component: Skeleton,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	width: '100%',
	height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
	border: '50%',
	width: 100,
	height: 100,
};

export const NormalDark = Template.bind({});
NormalDark.args = {
	width: '100%',
	height: 200,
};
NormalDark.decorators = [themeDecorator(Theme.DARK)];
export const CircleDark = Template.bind({});
CircleDark.args = {
	border: '50%',
	width: 100,
	height: 100,
};
CircleDark.decorators = [themeDecorator(Theme.DARK)];

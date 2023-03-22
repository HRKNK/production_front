import Text, { TextSize, TextTheme } from './Text';

import React from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	title: 'Title lorem ipsun',
	text: 'Description Description Description Description',
};

export const Error = Template.bind({});
Error.args = {
	title: 'Title lorem ipsun',
	text: 'Description Description Description Description',
	theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
	title: 'Title lorem ipsun',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
	text: 'Description Description Description Description',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	title: 'Title lorem ipsun',
	text: 'Description Description Description Description',
};
PrimaryDark.decorators = [themeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
	title: 'Title lorem ipsun',
};
OnlyTitleDark.decorators = [themeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
	text: 'Description Description Description Description',
};
OnlyTextDark.decorators = [themeDecorator(Theme.DARK)];
function ThemeDecorator (DARK: any) {
	throw new Error('Function not implemented.');
}
export const SizeL = Template.bind({});
SizeL.args = {
	title: 'Title lorem ipsun',
	text: 'Description Description Description Description',
	size: TextSize.L,
};

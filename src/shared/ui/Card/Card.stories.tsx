import { Card } from './Card';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { Text } from 'shared/ui/Text/public';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/Card',
	component: Card,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	children: <Text title='test' text='text text' />,
};

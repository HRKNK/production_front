import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from '../Button/Button';
import { Dropdown } from './Dropdown';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/Dropdown',
	component: Dropdown,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	trigger: <Button>Open</Button>,
	items: [
		{
			content: 'first',
		},
		{
			content: 'second',
		},
		{
			content: 'third',
		},
	],
};

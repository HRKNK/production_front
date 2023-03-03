import Input from './Input';

import React from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/Input',
	component: Input,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	placeholder: 'Type text',
	value: '123123',
};

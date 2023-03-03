import LoginForm from './LoginForm';

import React from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/LoginForm',
	component: LoginForm,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

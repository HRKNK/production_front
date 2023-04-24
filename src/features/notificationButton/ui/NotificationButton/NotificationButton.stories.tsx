import { NotificationButton } from './NotificationButton';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/NotificationButton',
	component: NotificationButton,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

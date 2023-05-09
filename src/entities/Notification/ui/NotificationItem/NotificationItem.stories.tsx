import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { NotificationItem } from './NotificationItem';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/Notification/NotificationItem',
	component: NotificationItem,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

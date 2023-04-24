import { NotificationList } from './NotificationList';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/NotificationList',
	component: NotificationList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

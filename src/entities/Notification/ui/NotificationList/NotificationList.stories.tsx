import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import { NotificationList } from './NotificationList';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/Notification/NotificationList',
	component: NotificationList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
	mockData: [
		{
			url: `${_API}/notifications`,
			method: 'GET',
			status: 200,
			response: [
				{
					id: '1',
					title: 'Заголовок 1',
					description: 'Описание уведомления 1',
				},
				{
					id: '2',
					title: 'Заголовок 2',
					description: 'Описание уведомления 2',
				},
				{
					id: '3',
					title: 'Заголовок 3',
					description: 'Описание уведомления 3',
				},
			],
		},
	],
};

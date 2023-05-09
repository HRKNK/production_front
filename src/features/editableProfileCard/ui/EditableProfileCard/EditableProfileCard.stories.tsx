import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import { EditableProfileCard } from './EditableProfileCard';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/editableProfileCard/EditableProfileCard',
	component: EditableProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

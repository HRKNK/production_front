import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import { EditableProfileCardHeader } from './EditableProfileCardHeader';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/editableProfileCard/EditableProfileCardHeader',
	component: EditableProfileCardHeader,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => <EditableProfileCardHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

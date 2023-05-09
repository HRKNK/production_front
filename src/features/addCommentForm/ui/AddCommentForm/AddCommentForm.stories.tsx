import { action } from '@storybook/addon-actions';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import AddCommentForm from './AddCommentForm';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/AddCommentForm',
	component: AddCommentForm,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	onSendComment: action('onSendComment'),
};
Normal.decorators = [StoreDecorator({})];

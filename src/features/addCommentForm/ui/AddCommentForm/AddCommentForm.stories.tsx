import AddCommentForm from './AddCommentForm';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

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
Normal.decorators = [
	StoreDecorator({}),
];

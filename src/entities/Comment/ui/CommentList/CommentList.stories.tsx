import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { CommentList } from './CommentList';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/CommentList',
	component: CommentList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

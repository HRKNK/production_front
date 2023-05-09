import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StarRating } from './StarRating';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/StarRating',
	component: StarRating,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

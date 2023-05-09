import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { ArticleSortSelector } from './ArticleSortSelector';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/Article/ArticleSortSelector',
	component: ArticleSortSelector,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => <ArticleSortSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { ArticlesPageFilters } from './ArticlesPageFilters';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'pages/Article/ArticlesPageFilters',
	component: ArticlesPageFilters,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

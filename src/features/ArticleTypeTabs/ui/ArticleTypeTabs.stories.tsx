import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { ArticleTypeTabs } from './ArticleTypeTabs';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/Article/ArticleTypeTabs',
	component: ArticleTypeTabs,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

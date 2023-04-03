import { ArticleTypeTabs } from './ArticleTypeTabs';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

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

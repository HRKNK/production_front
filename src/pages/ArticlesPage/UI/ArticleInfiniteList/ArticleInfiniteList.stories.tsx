import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import { ArticleInfiniteList } from './ArticleInfiniteList';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'pages/ArticlesPage/ArticleInfiniteList',
	component: ArticleInfiniteList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => <ArticleInfiniteList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

import { ArticleInfiniteList } from './ArticleInfiniteList';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

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

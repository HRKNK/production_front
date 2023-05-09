import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import ArticleRating from './ArticleRating';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/ArticleRating',
	component: ArticleRating,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {
	articleId: '1',
};
Normal.decorators = [
	StoreDecorator({
		user: {
			authData: { id: '1' },
		},
	}),
];
Normal.parameters = {
	mockData: [
		{
			url: `${_API}/article-ratings?userId=1&articleId=1`,
			method: 'GET',
			status: 200,
			response: [{ rate: 4 }],
		},
	],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {
	articleId: '1',
};
WithoutRate.decorators = [
	StoreDecorator({
		user: {
			authData: { id: '1' },
		},
	}),
];
WithoutRate.parameters = {
	mockData: [
		{
			url: `${_API}/article-ratings?userId=1&articleId=1`,
			method: 'GET',
			status: 200,
			response: [],
		},
	],
};

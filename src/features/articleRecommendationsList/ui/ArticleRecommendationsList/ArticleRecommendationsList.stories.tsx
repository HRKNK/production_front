import { ArticleRecommendationsList } from './ArticleRecommendationsList';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';
import { type Article } from 'entities/Article/public';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Theme } from 'app/providers/ThemeProvider/public';

const article: Article = {
	id: '1',
	img: 'https://w7.pngwing.com/pngs/191/49/png-transparent-notes-office-pages-papers-print-report-documents-article-news-journalism.png',
	createdAt: '',
	views: 100,
	user: { id: '1', username: 'username' },
	blocks: [],
	type: [],
	title: 'Title',
	subtitle: 'Subtitle',
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'features/ArticleRecommendationsList',
	component: ArticleRecommendationsList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
	StoreDecorator({}),
	themeDecorator(Theme.GREEN),
];
Normal.parameters = {
	mockData: [
		{
			url: `${_API}/articles?_limit=3`,
			method: 'GET',
			status: 200,
			response: [
				{ ...article, id: '1' },
				{ ...article, id: '2' },
				{ ...article, id: '3' },
			],
		},
	],
};

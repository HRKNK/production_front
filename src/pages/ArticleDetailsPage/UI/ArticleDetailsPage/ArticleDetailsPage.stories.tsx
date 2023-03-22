import ArticleDetailsPage from './ArticleDetailsPage';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/ArticleDetailsPage',
	component: ArticleDetailsPage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

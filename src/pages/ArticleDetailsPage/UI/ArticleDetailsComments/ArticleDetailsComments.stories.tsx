import { ArticleDetailsComments } from './ArticleDetailsComments';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
	component: ArticleDetailsComments,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

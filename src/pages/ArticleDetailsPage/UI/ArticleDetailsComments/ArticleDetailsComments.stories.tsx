import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import { ArticleDetailsComments } from './ArticleDetailsComments';

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
Normal.args = {
	id: '1',
};
Normal.decorators = [StoreDecorator({})];

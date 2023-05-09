import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'shared/ArticleDetailsPageHeader',
	component: ArticleDetailsPageHeader,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

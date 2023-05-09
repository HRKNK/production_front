import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

import ArticlesPage from './ArticlesPage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'pages/ArticlesPage',
	component: ArticlesPage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

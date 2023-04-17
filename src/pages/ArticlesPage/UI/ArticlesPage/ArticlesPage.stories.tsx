import ArticlesPage from './ArticlesPage';

import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';

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

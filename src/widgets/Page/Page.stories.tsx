import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Page } from './Page';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'widgets/Page',
	component: Page,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

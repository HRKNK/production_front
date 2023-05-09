import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { CurrencySelect } from './CurrencySelect';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/CurrencySelect',
	component: CurrencySelect,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

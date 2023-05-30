import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Country } from 'entities/Country/public';
import { Currency } from 'entities/Currency/public';
import avatar from 'shared/assets/tests/storybook.jpg';

import { ProfileCardDeprecated } from './ProfileCardDeprecated';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'entities/ProfileCardDeprecated',
	component: ProfileCardDeprecated,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => <ProfileCardDeprecated {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	data: {
		username: 'Admin',
		age: 25,
		country: Country.Ukraine,
		lastname: 'Vups',
		first: 'Ups',
		city: 'Moscow',
		currency: Currency.USD,
		avatar,
	},
};

export const WithError = Template.bind({});
WithError.args = {
	error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};

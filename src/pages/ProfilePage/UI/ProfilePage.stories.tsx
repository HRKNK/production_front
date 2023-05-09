import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import React from 'react';

import { Theme } from 'app/providers/ThemeProvider/public';
import { Country } from 'entities/Country/public';
import { Currency } from 'entities/Currency/public';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';

import ProfilePage from '../../ProfilePage/UI/ProfilePage';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	StoreDecorator({
		profile: {
			form: {
				username: 'Admin',
				age: 25,
				country: Country.Ukraine,
				lastname: 'Vups',
				first: 'Ups',
				city: 'Moscow',
				currency: Currency.USD,
			},
		},
	}),
];

export const Green = Template.bind({});
Green.args = {};
Green.decorators = [
	themeDecorator(Theme.GREEN),
	StoreDecorator({
		profile: {
			form: {
				username: 'Admin',
				age: 25,
				country: Country.Ukraine,
				lastname: 'Vups',
				first: 'Ups',
				city: 'Moscow',
				currency: Currency.USD,
			},
		},
	}),
];

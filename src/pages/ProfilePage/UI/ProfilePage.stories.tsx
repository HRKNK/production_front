import ProfilePage from '../../ProfilePage/UI/ProfilePage';

import React from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider/public';
import { StoreDecorator } from 'shared/config/storybook/storeDecorator';
import { themeDecorator } from 'shared/config/storybook/themeDecorator';
import { Country } from 'entities/Country/public';
import { Currency } from 'entities/Currency/public';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
	title: 'Pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
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
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [themeDecorator(Theme.DARK), StoreDecorator({
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
})];

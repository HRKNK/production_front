import { getProfileForm } from './getProfileForm';

import { type StateSchema } from 'app/providers/storeProvider/public';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

describe('getProfileForm.test', () => {
	test('should return error', () => {
		const data = {
			username: 'Admin',
			age: 25,
			country: Country.Ukraine,
			lastname: 'Vups',
			first: 'Ups',
			city: 'Moscow',
			currency: Currency.USD,
		};
		const state: DeepPartial<StateSchema> = {
			profile: {
				form: data,
			},
		};
		expect(getProfileForm(state as StateSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileForm(state as StateSchema)).toEqual(undefined);
	});
});

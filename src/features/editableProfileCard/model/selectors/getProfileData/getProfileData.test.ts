import { type StateSchema } from 'app/providers/storeProvider/public';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
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
				// тестируемый объект data из profile (внутри StateSchema)
				data,
			},
		};
		expect(getProfileData(state as StateSchema)).toEqual(data); // state == data
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});

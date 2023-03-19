import { getProfileError } from './getProfileError';

import { type StateSchema } from 'app/providers/storeProvider/public';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

describe('getProfileError.test', () => {
	test('should return error', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				error: '123',
			},
		};
		expect(getProfileError(state as StateSchema)).toEqual('123');
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileError(state as StateSchema)).toEqual(undefined);
	});
});

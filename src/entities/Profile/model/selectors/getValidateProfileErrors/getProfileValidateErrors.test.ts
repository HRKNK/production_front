import { getValidateProfileErrors } from './getValidateProfileErrors';

import { ValidateProfileError } from '../../types/profile';

import { type StateSchema } from 'app/providers/storeProvider/public';

describe('getProfileValidateErrors.test', () => {
	test('should work with filled state', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				validateError: [
					ValidateProfileError.SERVER_ERROR,
					ValidateProfileError.INCORRECT_AGE,
				],
			},
		};
		expect(getValidateProfileErrors(state as StateSchema)).toEqual([
			ValidateProfileError.SERVER_ERROR,
			ValidateProfileError.INCORRECT_AGE,
		]);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getValidateProfileErrors(state as StateSchema)).toEqual(undefined);
	});
});

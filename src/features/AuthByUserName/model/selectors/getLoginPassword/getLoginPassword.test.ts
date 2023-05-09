// import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from 'app/providers/storeProvider/public';

import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
	test('should return value', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: {
				password: '123123',
			},
		};
		expect(getLoginPassword(state as StateSchema)).toEqual('123123');
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginPassword(state as StateSchema)).toEqual('');
	});
});

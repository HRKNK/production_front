import { loginActions, loginReducer } from './loginSlice';

import { type LoginSchema } from '../types/loginSchema';

// import { type DeepPartial } from '@reduxjs/toolkit';

describe('loginSlice.test', () => {
	test('test set username', () => {
		const state: DeepPartial<LoginSchema> = { username: '123' };
		// в редьюсер передаем action на изменение юзернейма, получаем результат изменения.
		expect(loginReducer(state as LoginSchema, loginActions.setUsername('123123'))).toEqual({ username: '123123' });
	});

	test('test set password', () => {
		const state: DeepPartial<LoginSchema> = { password: '123' };
		expect(loginReducer(state as LoginSchema, loginActions.setPassword('123123'))).toEqual({ password: '123123' });
	});
});
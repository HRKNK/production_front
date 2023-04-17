import { profileActions, profileReducer } from './profileSlice';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';

import { type ProfileSchema } from '../types/editableProfileCardSchema';

import { ValidateProfileError } from '../consts/consts';

import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';

const data = {
	username: 'Admin',
	age: 25,
	country: Country.Ukraine,
	lastname: 'Vups',
	first: 'Ups',
	city: 'Moscow',
	currency: Currency.USD,
};

describe('profileSlice.test', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileSchema> = { readonly: false };
		expect(profileReducer(state as ProfileSchema, profileActions.setReadOnly(true))).toEqual({ readonly: true });
	});

	test('test cancel edit', () => {
		const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };

		expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
			.toEqual({ readonly: true, validateErrors: undefined, data, form: data });
	});

	test('test update profile', () => {
		const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };
		expect(profileReducer(state as ProfileSchema, profileActions.updateProfileData({ username: '123456' })))
			.toEqual({ form: { username: '123456' } });
	});

	/// service

	test('test update profile service pending', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: false,
			validateError: [ValidateProfileError.SERVER_ERROR],
		};

		expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({ // результат в момент updateProfileData.pending
			isLoading: true,
			validateErrors: undefined,
		});
	});

	test('test update profile service fullfiled', () => {
		const state: DeepPartial<ProfileSchema> = {
			isLoading: true,
		};

		expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual({
			// результат в момент updateProfileData.pending // вспомогательный аргумент оставляем пустым
			isLoading: false,
			validateErrors: undefined,
			readonly: true,
			validateError: undefined,
			form: data,
			data,
		});
	});
});

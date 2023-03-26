import { updateProfileData } from './updateProfileData';

import { ValidateProfileError } from '../../types/profile';

import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';
import { userActions } from 'entities/User/public';
import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country/model/types/country';

jest.mock('axios');
const mockedAxios = jest.mocked(axios); // модуль мока с глубоким копированием полей

const data = {
	id: '1',
	username: 'Admin',
	age: 25,
	country: Country.Ukraine,
	lastname: 'Vups',
	first: 'Ups',
	city: 'Moscow',
	currency: Currency.USD,
};

describe('fetchProfileData.test', () => {
	test('success update', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
			},
		}); // закидываем action

		thunk.api.put.mockReturnValue(Promise.resolve({ data })); // мок ответ от сервера
		const result = await thunk.callThunk(); // вызов запроса

		expect(thunk.api.put).toHaveBeenCalled(); // запрос был отправлен ? // or mockedAxios.post
		expect(result.meta.requestStatus).toBe('fulfilled'); // запрос вернул статус fulfilled?
		expect(result.payload).toEqual(data); // возвращает данные о пользователе
	});

	test('error update', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data,
			},
		}); // закидываем action
		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 })); // ответ от сервера 403
		const result = await thunk.callThunk(); // вызов запроса
		expect(result.meta.requestStatus).toBe('rejected'); // запрос вернул статус rejected?
		expect(result.payload).toEqual([
			ValidateProfileError.SERVER_ERROR, // вернул массив ошибок
		]);
	});

	test('validate error', async () => {
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: { ...data, lastname: '' },
			},
		}); // закидываем action
		thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 })); // ответ от сервера 403
		const result = await thunk.callThunk(); // вызов запроса
		expect(result.meta.requestStatus).toBe('rejected'); // запрос вернул статус rejected?
		expect(result.payload).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA, // вернул массив ошибок
		]);
	});
});

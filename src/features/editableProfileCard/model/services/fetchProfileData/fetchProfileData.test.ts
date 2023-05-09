import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';
import { userActions } from 'entities/User/public';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { fetchProfileData } from './fetchProfileData';

const data = {
	username: 'Admin',
	age: 25,
	country: Country.Ukraine,
	lastname: 'Vups',
	first: 'Ups',
	city: 'Moscow',
	currency: Currency.USD,
};

describe('fetchProfileData.test', () => {
	test('success fetch', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData); // закидываем action
		thunk.api.get.mockReturnValue(Promise.resolve({ data })); // мок ответ от сервера
		const result = await thunk.callThunk('1');
		expect(thunk.api.get).toHaveBeenCalled(); // запрос был отправлен ? // or mockedAxios.post
		expect(result.meta.requestStatus).toBe('fulfilled'); // запрос вернул статус fulfilled?
		expect(result.payload).toEqual(data); // возвращает данные о пользователе
	});

	test('error fetch', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData); // закидываем action
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 })); // ответ от сервера 403
		const result = await thunk.callThunk('1');
		expect(result.meta.requestStatus).toBe('rejected'); // запрос вернул статус rejected?
	});
});

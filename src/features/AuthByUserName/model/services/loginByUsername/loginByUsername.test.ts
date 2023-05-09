import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { userActions } from 'entities/User/public';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios); // модуль мока с глубоким копированием полей

describe('loginByUsername.test', () => {
	test('success login', async () => {
		const userValue = { username: '123', id: '1' };
		// mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // axios.post // мок ответ от сервера

		const thunk = new TestAsyncThunk(loginByUsername); // закидываем action
		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue })); // мок ответ от сервера
		const result = await thunk.callThunk({ username: '123', password: '123' });

		expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // диспатч был вызван?
		expect(thunk.dispatch).toHaveBeenCalledTimes(3); // кол-во вызовов диспатча ()
		expect(thunk.api.post).toHaveBeenCalled(); // запрос был отправлен ? // or mockedAxios.post
		expect(result.meta.requestStatus).toBe('fulfilled'); // запрос вернул статус fulfilled?
		expect(result.payload).toEqual(userValue); // возвращает данные о пользователе
	});

	test('error login', async () => {
		// mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 })); // axios.post //ответ от сервера 403

		const thunk = new TestAsyncThunk(loginByUsername); // закидываем action
		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 })); // ответ от сервера 403
		const result = await thunk.callThunk({ username: '123', password: '123' });

		expect(thunk.dispatch).toHaveBeenCalledTimes(2); // кол-во вызовов диспатча ()
		expect(thunk.api.post).toHaveBeenCalled(); // запрос был отправлен ? // or mockedAxios.post
		expect(result.meta.requestStatus).toBe('rejected'); // запрос вернул статус rejected?
		expect(result.payload).toBe('Вы ввели неверный логин или пароль'); // возвращает ошибку
	});

	// let dispatch: Dispatch;
	// let getState: () => StateSchema;
	//
	// beforeEach(() => {
	//     dispatch = jest.fn();
	//     getState = jest.fn();
	// });

	// test('success login', async () => {
	//     const userValue = { username: '123', id: '1' };
	//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
	//     const action = loginByUsername({ username: '123', password: '123' });
	//     const result = await action(dispatch, getState, undefined);
	//
	//     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
	//     expect(dispatch).toHaveBeenCalledTimes(3);
	//     expect(mockedAxios.post).toHaveBeenCalled();
	//     expect(result.meta.requestStatus).toBe('fulfilled');
	//     expect(result.payload).toEqual(userValue);
	// });
	//
	// test('error login', async () => {
	//     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
	//     const action = loginByUsername({ username: '123', password: '123' });
	//     const result = await action(dispatch, getState, undefined);
	//
	//     expect(dispatch).toHaveBeenCalledTimes(2);
	//     expect(mockedAxios.post).toHaveBeenCalled();
	//     expect(result.meta.requestStatus).toBe('rejected');
	//     expect(result.payload).toBe('error');
	// });
});

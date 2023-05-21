import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ThunkConfig } from 'app/providers/storeProvider/public';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { getUserDataByIDQuery } from '../../api/userApi';
import { type User } from '../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'User/initAuthData',
	async (_, thunkApi) => {
		// jsonSettings: JsonSettings = принят на вход createAsyncThunk
		const { rejectWithValue, dispatch } = thunkApi;
		const userID = localStorage.getItem(USER_LOCALSTORAGE_KEY);

		if (!userID) return rejectWithValue('error');

		try {
			// Запрос без хука (позволяет вызвать вне компонентов) // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks#adding-a-subscription
			const response = await dispatch(getUserDataByIDQuery(userID)).unwrap(); // Разворачивает вызов мутации, чтобы предоставить необработанный ответ/ошибку.

			if (!response.jsonSettings) return rejectWithValue('error');

			return response; // возвращаем юзера
		} catch (e) {
			console.log(e);
			return rejectWithValue('error');
		}
	}
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { type User, userActions } from 'entities/User/public';
// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string, }>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await axios.post<User>('http://localhost:8000/login', authData);

			if (!response.data) {
				throw new Error();
			}

			// localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
			// thunkAPI.dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			console.log(e);
			return thunkAPI.rejectWithValue('error'); // обработка ошибки
		}
	},
);

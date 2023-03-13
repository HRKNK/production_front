import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig, type ThunkExtraArg } from 'app/providers/storeProvider/public';
import { type User, userActions } from 'entities/User/public';
import i18n from 'shared/config/I18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await thunkAPI.extra.api.post<User>('/login', authData);

			if (!response.data) {
				throw new Error();
			}

			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
			thunkAPI.dispatch(userActions.setAuthData(response.data));
			// thunkAPI.extra.navigate('/about');

			return response.data;
		} catch (e) {
			console.log(e);
			return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль')); // обработка ошибки
		}
	},
);

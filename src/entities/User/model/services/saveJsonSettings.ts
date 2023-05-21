import { createAsyncThunk } from '@reduxjs/toolkit';

import { type StateSchema, type ThunkConfig } from 'app/providers/storeProvider/public';

import { setJsonSettingsMutation } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/getUserInited/getJsonSettings';
import { type JsonSettings } from '../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'User/saveJsonSettings',
	async (newJsonSettings, thunkApi) => {
		// jsonSettings: JsonSettings = принят на вход createAsyncThunk
		const { extra, rejectWithValue, getState, dispatch } = thunkApi;
		const userData = getUserAuthData(getState() as StateSchema); // для запроса необходима информация о пользователе
		const currentSettings = getJsonSettings(getState() as StateSchema);

		if (!userData) {
			return rejectWithValue('error');
		}

		try {
			// Запрос без хука (позволяет вызвать вне компонентов) // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks#adding-a-subscription
			const response = await dispatch(
				setJsonSettingsMutation({
					userId: userData.id,
					jsonSettings: {
						...currentSettings, // старые настройки
						...newJsonSettings, // новые настройки
					},
				})
			).unwrap(); // Разворачивает вызов мутации, чтобы предоставить необработанный ответ/ошибку.

			if (!response.jsonSettings) {
				return rejectWithValue('error');
			}

			return response.jsonSettings; // из response возвращаем только jsonSettings
		} catch (e) {
			console.log(e);
			return rejectWithValue('error');
		}
	}
);

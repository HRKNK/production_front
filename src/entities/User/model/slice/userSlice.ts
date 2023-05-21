import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { setFeatureFlags } from 'shared/lib/features/setGetFeatures';

import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { type JsonSettings } from '../types/jsonSettings';
import { type User, type UserSchema } from '../types/user';

const initialState: UserSchema = {
	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
			setFeatureFlags(action.payload.features); // Фича флаги
			localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id);
		},
		// Перенесено в extraReducers
		// initAuthData: (state) => {
		// 	const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
		// 	if (user) {
		// 		const json = JSON.parse(user) as User;
		// 		state.authData = json;
		// 		setFeatureFlags(json.features); // Фича флаги
		// 	}
		// 	// else { // На компоненты вне авторизации
		// 	// 	setFeatureFlags({ isArticleRatingEnabled: false, isCounterEnabled: false });
		// 	// }
		// 	state._inited = true;
		// },
		logout: (state) => {
			state.authData = undefined;
			localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		},
	},
	extraReducers: (builder) => {
		// хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
				// запрос выполнен
				if (state.authData) {
					state.authData.jsonSettings = action.payload; // записываем ответ от сервера
				}
			});

		builder // state = initialState
			.addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
				// запрос выполнен
				state.authData = action.payload;
				setFeatureFlags(action.payload.features); // Фича флаги
				state._inited = true;
			});
		builder // state = initialState
			.addCase(initAuthData.rejected, (state) => {
				// запрос вернул ошибку
				state._inited = true; // записываем ответ от сервера
			});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

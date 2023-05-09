import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { type LoginSchema } from '../types/loginSchema';

const initialState: LoginSchema = {
	isLoading: false,
	username: '',
	password: '',
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		// state = initialState
		setUsername: (state, action: PayloadAction<string>) => {
			// зарезервированный тип данных - ожидаемый тип данных
			state.username = action.payload; // пэйлоад из диспатча
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
	},
	extraReducers: (builder) => {
		// хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(loginByUsername.pending, (state) => {
				// идёт запрос // ожидание
				state.error = undefined; // обнуление ошибки
				state.isLoading = true;
			})
			.addCase(loginByUsername.fulfilled, (state, action) => {
				// запрос выполнен
				state.isLoading = false;
			})
			.addCase(loginByUsername.rejected, (state, action) => {
				// вернулась ошибка
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;

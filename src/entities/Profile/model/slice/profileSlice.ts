import { type Profile, type ProfileSchema } from '../types/profile';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(fetchProfileData.pending, (state) => { // идёт запрос // ожидание
				state.error = undefined; // обнуление ошибки
				state.isLoading = true;
			})
			.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => { // запрос выполнен
				state.isLoading = false;
				state.data = action.payload; // записываем ответ от сервера
			})
			.addCase(fetchProfileData.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

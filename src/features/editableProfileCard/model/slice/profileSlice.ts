import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';

import { type ProfileSchema } from '../types/editableProfileCardSchema';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Profile } from 'entities/Profile/public';

const initialState: ProfileSchema = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setReadOnly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		cancelEdit: (state) => {
			state.readonly = true;
			state.form = state.data;
			state.validateError = undefined; // очищает массив ошибок валидации
		},
		updateProfileData: (state, action: PayloadAction<Profile>) => {
			state.form = {
				...state.data,
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState

			// GET
			.addCase(fetchProfileData.pending, (state) => { // идёт запрос // ожидание
				state.error = undefined; // обнуление ошибки
				state.isLoading = true;
			})
			.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => { // запрос выполнен
				state.isLoading = false;
				state.data = action.payload; // записываем ответ от сервера
				state.form = action.payload; // записываем ответ от сервера
			})
			.addCase(fetchProfileData.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload; // записываем информацию об ошибке
			})

			// PUT
			.addCase(updateProfileData.pending, (state) => { // идёт запрос // ожидание
				// state.error = undefined; // обнуление ошибки
				state.validateError = undefined; // обнуление ошибки
				state.isLoading = true;
			})
			.addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => { // запрос выполнен
				state.isLoading = false;
				state.data = action.payload; // записываем ответ от сервера
				state.form = action.payload; // записываем ответ от сервера
				state.readonly = true; // обнуление редактирования
				state.validateError = undefined; // обнуление ошибки
			})
			.addCase(updateProfileData.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				// state.error = action.payload; // записываем информацию об ошибке
				state.validateError = action.payload; // записываем информацию об ошибке
			});
	},
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

import { type Profile } from '../../types/profile';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from 'app/providers/storeProvider/public';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'profile/fetchProfileData',
	async (_, thunkApi) => {
		try {
			const response = await thunkApi.extra.api.get<Profile>('/profile');
			return response.data;
		} catch (e) {
			console.log(e);
			return thunkApi.rejectWithValue('error');
		}
	},
);
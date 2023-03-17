/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { type Profile } from '../../types/profile';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type StateSchema, type ThunkConfig } from 'app/providers/storeProvider/public';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
	'profile/updateProfileData',
	async (_, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;
		const formData = getProfileForm(getState() as StateSchema);
		try {
			const response = await extra.api.put<Profile>('/profile', formData); // обновление данных
			return response.data;
		} catch (e) {
			console.log(e);
			return rejectWithValue('error');
		}
	},
);

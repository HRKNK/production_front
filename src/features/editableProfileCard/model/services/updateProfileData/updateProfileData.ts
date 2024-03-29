/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { type StateSchema, type ThunkConfig } from 'app/providers/storeProvider/public';
import { type Profile } from 'entities/Profile/public';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>( // ThunkConfig<string>>
	'profile/updateProfileData',
	async (_, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;
		const formData = getProfileForm(getState() as StateSchema);

		const errors = validateProfileData(formData);
		if (errors.length) {
			return rejectWithValue(errors);
		}
		try {
			const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData); // обновление данных
			if (!response.data) {
				throw new Error();
			}
			return response.data;
		} catch (e) {
			console.log(e);
			return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
		}
	}
);

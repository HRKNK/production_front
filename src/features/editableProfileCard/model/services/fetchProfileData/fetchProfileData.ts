import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from 'app/providers/storeProvider/public';
import { type Profile } from 'entities/Profile/public';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'profile/fetchProfileData',
	async (userID, thunkApi) => {
		try {
			const response = await thunkApi.extra.api.get<Profile>(`/profile/${userID}`);

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.log(e);
			return thunkApi.rejectWithValue('error');
		}
	},
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ThunkConfig } from 'app/providers/storeProvider/public';
import { type FeatureFlags } from 'shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../setGetFeatures';

interface UpdateFeatureFlagOptions {
	userId: string;
	newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<void, UpdateFeatureFlagOptions, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'services/updateFeatureFlags',
	async ({ userId, newFeatures }, thunkApi) => {
		const { rejectWithValue, dispatch } = thunkApi;

		try {
			await dispatch(
				// Запрос без хука (позволяет вызвать вне компонентов) // https://redux-toolkit.js.org/rtk-query/usage/usage-without-react-hooks#adding-a-subscription
				updateFeatureFlagsMutation({
					userId,
					features: {
						...getAllFeatureFlags(),
						...newFeatures,
					},
				})
			);

			window.location.reload(); // перезагрузить страницу (фича не реактивна)
			return undefined;
		} catch (e) {
			console.log(e);
			return rejectWithValue('error');
		}
	}
);

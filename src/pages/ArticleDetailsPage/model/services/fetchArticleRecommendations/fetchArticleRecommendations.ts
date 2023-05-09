import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ThunkConfig } from 'app/providers/storeProvider/public';
import { type Article } from 'entities/Article/public';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articleDetailsPage/fetchArticleRecommendations',
	async (props, thunkApi) => {
		// props: void = принят на вход createAsyncThunk
		const { extra, rejectWithValue } = thunkApi;

		try {
			const response = await extra.api.get<Article[]>('/articles', {
				params: {
					_expand: 'user',
					_limit: 4,
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);

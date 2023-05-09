import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ThunkConfig } from 'app/providers/storeProvider/public';

import { type Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articleDetails/fetchArticleById',
	async (articleId, thunkApi) => {
		// articleId: string = принят на вход createAsyncThunk
		const { extra, rejectWithValue } = thunkApi;

		try {
			if (!articleId) {
				// если undefined
				throw new Error('');
			}

			const response = await extra.api.get<Article>(`/articles/${articleId}`, {
				params: {
					_expand: 'user',
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.log(e);
			return rejectWithValue('error');
		}
	}
);

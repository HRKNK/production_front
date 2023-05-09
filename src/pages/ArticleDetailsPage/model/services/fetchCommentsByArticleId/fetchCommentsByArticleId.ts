import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ThunkConfig } from 'app/providers/storeProvider/public';
import { type Comment } from 'entities/Comment/public';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articleDetailsPage/fetchCommentsByArticleId',
	async (articleId, thunkApi) => {
		// articleId: string = принят на вход createAsyncThunk
		const { extra, rejectWithValue } = thunkApi;

		if (!articleId) {
			// если undefined
			return rejectWithValue('error');
		}

		try {
			const response = await extra.api.get<Comment[]>('/comments', {
				params: {
					// https://github.com/typicode/json-server#relationships
					articleId,
					_expand: 'user',
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

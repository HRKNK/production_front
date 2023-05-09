import { createAsyncThunk } from '@reduxjs/toolkit';

import { type StateSchema, type ThunkConfig } from 'app/providers/storeProvider/public';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { type Comment } from 'entities/Comment/public';
import { getUserAuthData } from 'entities/User/public';

import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string | undefined, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articleDetails/addCommentForArticle',
	async (text, thunkApi) => {
		// text: string = принят на вход createAsyncThunk
		const { extra, dispatch, rejectWithValue, getState } = thunkApi;

		const userData = getUserAuthData(getState() as StateSchema);
		const article = getArticleDetailsData(getState() as StateSchema);

		if (!userData || !text || !article) {
			return rejectWithValue('no data');
		}

		try {
			const response = await extra.api.post<Comment>('/comments', {
				articleId: article.id,
				userId: userData.id,
				text,
			});

			if (!response.data) {
				throw new Error();
			}

			void dispatch(fetchCommentsByArticleId(article.id));

			return response.data;
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);

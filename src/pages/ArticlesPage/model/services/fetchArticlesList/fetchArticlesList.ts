import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type StateSchema, type ThunkConfig } from 'app/providers/StoreProvider/public';
import { type Article } from 'entities/Article/public';

interface FetchArticlesListProps {
	page?: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articlesPage/fetchArticlesList',
	async (props, thunkApi) => { // props: FetchArticlesListProps = принят на вход createAsyncThunk
		const { extra, rejectWithValue, getState } = thunkApi;
		const { page = 1 } = props;
		const limit = getArticlesPageLimit(getState() as StateSchema); // getState - передать актуальный стейт в селектор

		try {
			const response = await extra.api.get<Article[]>('/articles', {
				params: { // квэри параметры
					_expand: 'user',
					_limit: limit,
					_page: page,
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			return rejectWithValue('error');
		}
	},
);

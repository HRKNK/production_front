import { getArticlesPageLimit, getArticlesPageNumber, getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType } from '../../selectors/articlesPageSelectors';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type StateSchema, type ThunkConfig } from 'app/providers/StoreProvider/public';
import { ArticleType, type Article } from 'entities/Article/public';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
	page?: number;
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articlesPage/fetchArticlesList',
	async (props, thunkApi) => { // props: FetchArticlesListProps = принят на вход createAsyncThunk
		const { extra, rejectWithValue, getState } = thunkApi;
		// const { page = 1 } = props;
		const limit = getArticlesPageLimit(getState() as StateSchema); // getState - передать актуальный стейт в селектор

		const page = getArticlesPageNumber(getState() as StateSchema);
		const sort = getArticlesPageSort(getState() as StateSchema);
		const order = getArticlesPageOrder(getState() as StateSchema);
		const search = getArticlesPageSearch(getState() as StateSchema);
		const type = getArticlesPageType(getState() as StateSchema);

		try {
			addQueryParams({ sort, order, search }); // добавить квери параметры в url строку
			const response = await extra.api.get<Article[]>('/articles', {
				params: { // квэри параметры
					_expand: 'user',
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					q: search,
					type: type === ArticleType.ALL ? undefined : type,
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

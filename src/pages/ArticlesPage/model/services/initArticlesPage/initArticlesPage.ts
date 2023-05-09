import { createAsyncThunk } from '@reduxjs/toolkit';

import { type StateSchema, type ThunkConfig } from 'app/providers/storeProvider/public';
import { type ArticleSortField, type ArticleType } from 'entities/Article/public';
import { type SortOrder } from 'shared/types';

import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articlesPage/initArticlesPage',
	async (searchParams, thunkApi) => {
		// searchParams: URLSearchParams = принят на вход createAsyncThunk
		const { getState, dispatch } = thunkApi;
		const inited = getArticlesPageInited(getState() as StateSchema);
		if (!inited) {
			// записываем квери параметры из url строки
			dispatch(articlesPageActions.setOrder((searchParams.get('order') as SortOrder) ?? null));
			dispatch(articlesPageActions.setSort((searchParams.get('sort') as ArticleSortField) ?? null));
			dispatch(articlesPageActions.setSearch(searchParams.get('search') ?? null));
			dispatch(articlesPageActions.setType((searchParams.get('type') as ArticleType) ?? null));

			dispatch(articlesPageActions.initState()); // достаем текущий вид отображения страницы
			void dispatch(fetchArticlesList({})); // запрос на статьи | номер страницы  page: 1
		}
	}
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { type ThunkConfig } from 'app/providers/storeProvider/public';
import { type StateSchema } from 'entities/Counter/public';

import { getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNumber } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	// createAsyncThunk<(что возвращаем), (что ожидаем на вход), { переопределение типа }
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;

		// Pagination
		const hasMore = getArticlesPageHasMore(getState() as StateSchema);
		const page = getArticlesPageNumber(getState() as StateSchema);
		const isLoading = getArticlesPageIsLoading(getState() as StateSchema);
		if (hasMore && !isLoading) {
			dispatch(articlesPageActions.setPage(page + 1)); // изменяем номер страницы
			void dispatch(fetchArticlesList({})); // запрос на статьи | номер страницы { page: page + 1 }
		}
	}
);

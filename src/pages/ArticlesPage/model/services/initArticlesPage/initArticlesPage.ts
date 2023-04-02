import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slices/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type StateSchema, type ThunkConfig } from 'app/providers/StoreProvider/public';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;
		const inited = getArticlesPageInited(getState() as StateSchema);
		if (!inited) {
			dispatch(articlesPageActions.initState()); // достаем текущий вид отображения страницы
			void dispatch(fetchArticlesList({ page: 1 })); // запрос на статьи | номер страницы
		}
	},
);

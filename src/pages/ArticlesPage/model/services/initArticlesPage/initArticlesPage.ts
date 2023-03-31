import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

import { articlesPageActions } from '../../slices/articlesPageSlice';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from 'app/providers/StoreProvider/public';
import { useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (_, thunkApi) => {
		const { dispatch } = thunkApi;
		const inited = useSelector(getArticlesPageInited);

		if (!inited) {
			dispatch(articlesPageActions.initState()); // достаем текущий вид отображения страницы
			void dispatch(fetchArticlesList({ page: 1 })); // запрос на статьи | номер страницы
		}
	},
);

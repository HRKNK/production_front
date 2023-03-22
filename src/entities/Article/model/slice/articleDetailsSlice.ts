import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { type Article } from '../types/article';
import { type ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ArticleDetailsSchema = {
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const articleDetailsSlice = createSlice({
	name: 'articleDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(fetchArticleById.pending, (state) => { // идёт запрос // ожидание
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => { // запрос выполнен
				state.isLoading = false;
				state.data = action.payload; // записываем ответ от сервера
			})
			.addCase(fetchArticleById.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload; // записываем информацию об ошибке
			});
	},
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;

import { type ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Comment } from 'entities/Comment/public';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { type StateSchema } from 'app/providers/storeProvider/public';

// https://redux-toolkit.js.org/api/createEntityAdapter
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape

const commentsAdapter = createEntityAdapter<Comment>({
	// Предположим, что идентификаторы хранятся в поле, отличном от `comment.id`
	selectId: (comment) => comment.id,
});

// Может создать набор запоминающихся селекторов на основе местоположения этого состояния
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(fetchCommentsByArticleId.pending, (state) => { // идёт запрос // ожидание
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => { // запрос выполнен
				state.isLoading = false;
				commentsAdapter.setAll(state, action.payload); // записываем ответ от сервера
			})
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload; // записываем информацию об ошибке
			});
	},
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;

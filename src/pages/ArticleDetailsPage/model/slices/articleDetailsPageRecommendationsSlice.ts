import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

import { type ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { type StateSchema } from 'app/providers/storeProvider/public';
import { type Article } from 'entities/Article/public';

// https://redux-toolkit.js.org/api/createEntityAdapter
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape

const recommendationsAdapter = createEntityAdapter<Article>({
	// Предположим, что идентификаторы хранятся в поле, отличном от `article.id`
	selectId: (article) => article.id,
});

// Может создать набор запоминающихся селекторов на основе местоположения этого состояния
export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
	(state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
	name: 'articleDetailsPageRecommendationsSlice',
	initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
	}),
	reducers: {},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(fetchArticleRecommendations.pending, (state) => { // идёт запрос // ожидание
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleRecommendations.fulfilled, (state, action) => { // запрос выполнен
				state.isLoading = false;
				recommendationsAdapter.setAll(state, action.payload); // записываем ответ от сервера
			})
			.addCase(fetchArticleRecommendations.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articleDetailsPageRecommendationsReducer } = articleDetailsPageRecommendationsSlice;

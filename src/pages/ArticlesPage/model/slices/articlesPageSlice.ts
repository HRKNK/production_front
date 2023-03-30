import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

import { type ArticlesPageSchema } from '../types/articlesPageSchema';

import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Article, ArticleView } from 'entities/Article/public';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { type StateSchema } from 'app/providers/storeProvider/public';

// https://redux-toolkit.js.org/api/createEntityAdapter
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape

const articlesAdapter = createEntityAdapter<Article>({
	// Предположим, что идентификаторы хранятся в поле, отличном от `article.id`
	selectId: (article) => article.id,
});

// Может создать набор запоминающихся селекторов на основе местоположения этого состояния
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {},
		view: ArticleView.SMALL,
		// pagination
		page: 1,
		hasMore: true,
	}),
	reducers: { // state = initialState
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload); // сохраняем вид статей в локал
		},
		initState: (state) => {
			const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView; // получаем вид статей из локал
			state.view = view;
			state.limit = view === ArticleView.BIG ? 4 : 9; // кол-во подгружаемых статей (в зависимости от вида статей)
		},
		setPage: (state, action: PayloadAction<number>) => { // текущая страница
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(fetchArticlesList.pending, (state) => { // идёт запрос // ожидание
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => { // запрос выполнен
				state.isLoading = false;
				// articlesAdapter.setAll(state, action.payload); // записываем ответ от сервера // список статей
				articlesAdapter.addMany(state, action.payload); // addMany - добавляет данные
				state.hasMore = action.payload.length > 0; // есть ли ещё данные?
			})
			.addCase(fetchArticlesList.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload; // записываем информацию об ошибке
			});
	},
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPageSlice;

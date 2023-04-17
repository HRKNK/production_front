import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

import { type ArticlesPageSchema } from '../types/articlesPageSchema';

import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Article, ArticleView, ArticleSortField, ArticleType } from 'entities/Article/public';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { type StateSchema } from 'app/providers/storeProvider/public';
import { type SortOrder } from 'shared/types';

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
		// init state
		_inited: false,
		// sort
		limit: 9,
		order: 'asc',
		search: '',
		sort: ArticleSortField.CREATED,
		type: ArticleType.ALL,
	}),
	reducers: { // state = initialState
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload); // сохраняем вид статей в локал
		},
		initState: (state) => {
			const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView; // получаем вид статей из локал
			state.view = view;
			state.limit = view === ArticleView.BIG ? 3 : 9; // кол-во подгружаемых статей (в зависимости от вида статей)
			state._inited = true;
		},
		setPage: (state, action: PayloadAction<number>) => { // текущая страница
			state.page = action.payload;
		},
		// сортировка
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload;
		},
		setSort: (state, action: PayloadAction<ArticleSortField>) => {
			state.sort = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload;
		},
	},
	extraReducers: (builder) => { // хэндлер для AsyncThunk
		builder // state = initialState
			.addCase(fetchArticlesList.pending, (state, action) => { // идёт запрос // ожидание
				state.error = undefined;
				state.isLoading = true;
				if (action.meta.arg.replace) { // обнуляем массив статей
					articlesAdapter.removeAll(state);
				}
			})
			.addCase(fetchArticlesList.fulfilled, (state, action) => { // action: PayloadAction<Article[]> // запрос выполнен
				state.isLoading = false;
				// articlesAdapter.setAll(state, action.payload); // записываем ответ от сервера // список статей
				state.hasMore = action.payload.length >= state.limit; // есть ли ещё данные?

				if (action.meta.arg.replace) { // аргументы из action // под сортировку
					articlesAdapter.setAll(state, action.payload); // записываем ответ от сервера // список статей
				} else { // под пагинацию
					articlesAdapter.addMany(state, action.payload); // addMany - добавляет данные
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => { // вернулась ошибка
				state.isLoading = false;
				state.error = action.payload; // записываем информацию об ошибке
			});
	},
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPageSlice;

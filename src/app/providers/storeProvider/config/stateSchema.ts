/* eslint-disable custom-plugin/public-imports */
import { type CombinedState, type AnyAction, type EnhancedStore, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type counterSchema } from 'entities/Counter/public';
import { type UserSchema } from 'entities/User/public';
import { type LoginSchema } from 'features/AuthByUserName/public';
import { type AxiosInstance } from 'axios';
import { type ArticleDetailsSchema } from 'entities/Article/public';
import { type AddCommentFormSchema } from 'features/addCommentForm/public';
import { type ArticlesPageSchema } from 'pages/ArticlesPage/model/types/articlesPageSchema';
import { type ScrollSaveSchema } from 'features/ScrollSave/public';
import { type ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage/model/types/public';
import { type rtkApi } from 'shared/api/rtkApi';
import { type ProfileSchema } from 'features/editableProfileCard/public';

export interface StateSchema {
	counter: counterSchema;
	user: UserSchema;
	scrollSave: ScrollSaveSchema;
	// РТК // Путь до редьюса : динамически-возвращаемое значение
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

	// Асинк редьюсеры // inject редьюса происходит через компоненты с последующим пробросом в DynamicModuleLoader
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	articleDetailsPage?: ArticleDetailsPageSchema; // сгруппированная схема
	addCommentForm?: AddCommentFormSchema;
	articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> { // EnhancedStore - стандартный тип стора
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}
export interface ThunkConfig<T> { // T = тип извне = пример: ThunkConfig<string>>
	rejectValue: T;
	extra: ThunkExtraArg;
	state?: StateSchema; // ThunkState
}

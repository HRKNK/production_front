import { type CombinedState, type AnyAction, type EnhancedStore, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type counterSchema } from 'entities/Counter/public';
import { type ProfileSchema } from 'entities/Profile/public';
import { type UserSchema } from 'entities/User/public';
import { type LoginSchema } from 'features/AuthByUserName/public';
import { type To, type NavigateOptions } from 'react-router-dom';
import { type AxiosInstance } from 'axios';
import { type ArticleDetailsSchema } from 'entities/Article/public';
import { type ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage/public';
import { type AddCommentFormSchema } from 'features/addCommentForm/public';
import { type ArticlesPageSchema } from 'pages/ArticlesPage/model/types/articlesPageSchema';

export interface StateSchema {
	counter: counterSchema;
	user: UserSchema;

	// Асинк редьюсеры
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	articleDetailsComments?: ArticleDetailsCommentsSchema;
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

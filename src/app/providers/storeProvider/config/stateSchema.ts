import { type CombinedState, type AnyAction, type EnhancedStore, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type counterSchema } from 'entities/Counter/public';
import { type ProfileSchema } from 'entities/Profile/public';
import { type UserSchema } from 'entities/User/public';
import { type LoginSchema } from 'features/AuthByUserName/public';

export interface StateSchema {
	counter: counterSchema;
	user: UserSchema;

	// Асинк редьюсеры
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
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

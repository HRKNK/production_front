import { type StateSchema } from './stateSchema';

import { createReducerManager } from './reducerManager';

import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/public';
import { userReducer } from 'entities/User/public';
// import { loginReducer } from 'features/AuthByUserName/public';

export function createReduxStore (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
		// loginForm: loginReducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce, // reducer: rootReducers,
		devTools: _IS_DEV,
		preloadedState: initialState,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	store.reducerManager = reducerManager;

	return store;
}

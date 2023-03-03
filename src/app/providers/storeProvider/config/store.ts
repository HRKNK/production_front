import { type StateSchema } from './stateSchema';

import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/public';
import { userReducer } from 'entities/User/public';

export function createReduxStore (initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
		user: userReducer,
	};

	return configureStore<StateSchema>({
		reducer: rootReducers,
		devTools: _IS_DEV,
		preloadedState: initialState,
	});
}

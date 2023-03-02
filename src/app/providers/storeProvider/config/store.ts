import { type StateSchema } from './stateSchema';

import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/public';

export function createReduxStore (initialState?: StateSchema) {
	return configureStore<StateSchema>({
		reducer: {
			counter: counterReducer,
		},
		devTools: _IS_DEV,
		preloadedState: initialState,
	});
}

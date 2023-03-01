import { type StateSchema } from './stateSchema';

import { configureStore } from '@reduxjs/toolkit';

export function createReduxStore (initialState?: StateSchema) {
	return configureStore<StateSchema>({
		reducer: {},
		devTools: _IS_DEV,
		preloadedState: initialState,
	});
}

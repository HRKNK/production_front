import { type ThunkExtraArg, type StateSchema } from './stateSchema';

import { createReducerManager } from './reducerManager';

import { type CombinedState, configureStore, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter/public';
import { userReducer } from 'entities/User/public';
import { $api } from 'shared/api/api';
import { scrollSaveReducer } from 'features/ScrollSave/public';
import { rtkApi } from 'shared/api/rtkApi';
// import { type NavigateOptions, type To } from 'react-router-dom';
// import { loginReducer } from 'features/AuthByUserName/public';

// createReduxStore - store-провайдер поверх App
export function createReduxStore (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
	const rootReducers: ReducersMapObject<StateSchema> = { // понимать как: combineReducers
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
		scrollSave: scrollSaveReducer,
		// loginForm: loginReducer,

		// Регистрация РТК
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	// типизируем extraArgument
	const extraArg: ThunkExtraArg = {
		api: $api,
	};

	const store = configureStore<StateSchema>({
		// создание toolkit стора

		// reducer: reducerManager.reduce as ReducersMapObject<StateSchema>, // as костылит тип для reducerManager
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>, // reducer: rootReducers,
		devTools: _IS_DEV,
		preloadedState: initialState,
		// @ts-expect-error
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg,
			},
		}).concat(rtkApi.middleware),
	});

	// @ts-expect-error
	store.reducerManager = reducerManager;
	return store;
}

// https://redux-toolkit.js.org/usage/usage-with-typescript
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']; // получаем тип хранилища createReduxStore => какое св-во нужно получить

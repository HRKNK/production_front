/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { type FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { type Reducer } from '@reduxjs/toolkit';
import { type ReduxStoreWithManager, type StateSchemaKey } from 'app/providers/storeProvider/config/stateSchema';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer]; // строка типа StateSchemaKey, сам Reducer

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfterUnmount = true } = props;

	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	useEffect(() => {
		const mountedReducers = store.reducerManager.getReducerMap();
		Object.entries(reducers).forEach(([name, reducer]) => { // ([name, reducer]: ReducersListEntry)
			const mounted = mountedReducers[name as StateSchemaKey];
			if (!mounted) {
				store.reducerManager.add(name as StateSchemaKey, reducer); // добавлено: as StateSchemaKey взамен типизации аргументов forEach
				dispatch({ type: `@INIT ${name} reducer` });
			}
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]) => { // ([name, reducer]: ReducersListEntry)
					store.reducerManager.remove(name as StateSchemaKey); // добавлено: as StateSchemaKey взамен типизации аргументов forEach
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
		// eslint-disable-next-line
    }, []);

	return (
	// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{children}
		</>
	);
};

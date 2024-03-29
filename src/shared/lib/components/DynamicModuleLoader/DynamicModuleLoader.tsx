/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { type Reducer } from '@reduxjs/toolkit';
import { type FC, type ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { type ReduxStoreWithManager, type StateSchema, type StateSchemaKey } from 'app/providers/storeProvider/config/stateSchema';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>; // забираем конкретное поле/название редьюса из StateSchema в качестве типа
	// без типизации ?: Reducer; // выглядит как any // NonNullable исключит любой null, undefined
};

type ReducersListEntry = [StateSchemaKey, Reducer]; // строка типа StateSchemaKey, сам Reducer

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
	children?: ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfterUnmount = true } = props;

	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	useEffect(() => {
		const mountedReducers = store.reducerManager.getReducerMap();
		Object.entries(reducers).forEach(([name, reducer]) => {
			// ([name, reducer]: ReducersListEntry)
			const mounted = mountedReducers[name as StateSchemaKey];
			if (!mounted) {
				store.reducerManager.add(name as StateSchemaKey, reducer); // добавлено: as StateSchemaKey взамен типизации аргументов forEach
				dispatch({ type: `@INIT ${name} reducer` });
			}
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]) => {
					// ([name, reducer]: ReducersListEntry)
					store.reducerManager.remove(name as StateSchemaKey); // добавлено: as StateSchemaKey взамен типизации аргументов forEach
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
		// eslint-disable-next-line
	}, []);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>{children}</>
	);
};

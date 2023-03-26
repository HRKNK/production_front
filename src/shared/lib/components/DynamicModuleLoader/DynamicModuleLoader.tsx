/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { type FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { type ReduxStoreWithManager, type StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { type Reducer } from '@reduxjs/toolkit';

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
		Object.entries(reducers).forEach(([name, reducer]) => { // ([name, reducer]: ReducersListEntry)
			store.reducerManager.add(name as StateSchemaKey, reducer); // добавлено: as StateSchemaKey взамен типизации аргументов forEach
			dispatch({ type: `@INIT ${name} reducer` });
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

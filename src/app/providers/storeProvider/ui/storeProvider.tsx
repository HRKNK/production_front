import { createReduxStore } from '../config/store';

import { type StateSchema } from '../config/stateSchema';

import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { type ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

const StoreProvider = ({ children, initialState, asyncReducers }: StoreProviderProps) => {
	const navigate = useNavigate();
	const store = createReduxStore(initialState as StateSchema, asyncReducers as ReducersMapObject<StateSchema>, navigate);
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};

export default StoreProvider;

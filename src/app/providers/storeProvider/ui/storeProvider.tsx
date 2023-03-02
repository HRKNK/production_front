import { createReduxStore } from '../config/store';

import { type StateSchema } from '../config/stateSchema';

import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { type DeepPartial } from '@reduxjs/toolkit';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: DeepPartial<StateSchema>;
}

const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
	const store = createReduxStore(initialState as StateSchema);
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};

export default StoreProvider;

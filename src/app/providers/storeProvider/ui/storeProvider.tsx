import { createReduxStore } from '../config/store';

import { type StateSchema } from '../config/stateSchema';

import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
}

const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
	const store = createReduxStore(initialState);
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
};

export default StoreProvider;

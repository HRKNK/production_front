/* eslint-disable custom-plugin/layer-imports */
// https://react.i18next.com/misc/testing
// import { type DeepPartial } from '@reduxjs/toolkit';
import { type ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import 'app/styles/index.scss';

import { Theme, ThemeProvider } from 'app/providers/ThemeProvider/public';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { type StateSchema } from 'entities/Counter/public';
import i18nft from 'shared/config/I18n/i18n-for-test';

export interface renderWithRouterOption {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
	theme?: Theme;
}

interface TestProviderProps {
	children: ReactNode;
	option?: renderWithRouterOption;
}

export function TestProvider(props: TestProviderProps) {
	const { children, option } = props;
	const { route = '/', initialState, asyncReducers, theme = Theme.GREEN } = option;
	return (
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
				<I18nextProvider i18n={i18nft}>
					<ThemeProvider initialTheme={theme}>
						<div className={`app ${theme}`}>{children}</div>
					</ThemeProvider>
				</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
	);
}

const componentRender = (component: ReactNode, option: renderWithRouterOption = {}) => {
	return render(<TestProvider option={option}>{component}</TestProvider>);
};
export default componentRender;

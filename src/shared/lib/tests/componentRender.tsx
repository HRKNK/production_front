// https://react.i18next.com/misc/testing

// import { type DeepPartial } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { StoreProvider } from 'app/providers/storeProvider/public';
import { type StateSchema } from 'entities/Counter/public';
import React, { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import i18nft from 'shared/config/I18n/i18n-for-test';

export interface renderWithRouterOption {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
}

const componentRender = (component: ReactNode, option: renderWithRouterOption = {}) => {
	const { route = '/', initialState } = option;
	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState}>
				<I18nextProvider i18n={i18nft}>
					{component}
				</I18nextProvider>
			</StoreProvider>
		</MemoryRouter>
		,
	);
};
export default componentRender;

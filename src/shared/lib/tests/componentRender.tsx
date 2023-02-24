// https://react.i18next.com/misc/testing

import { render } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import i18nft from 'shared/config/I18n/i18n-for-test';

export interface renderWithRouterOption {
	route?: string;
}

const componentRender = (component: ReactNode, option: renderWithRouterOption = {}) => {
	const { route = '/' } = option;
	return render(
		<MemoryRouter initialEntries={[route]}>
			<I18nextProvider i18n={i18nft}>
				{component}
			</I18nextProvider>
		</MemoryRouter>,
	);
};
export default componentRender;

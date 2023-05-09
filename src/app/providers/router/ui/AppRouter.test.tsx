import { screen } from '@testing-library/react';

import { UserRole } from 'entities/User/public';
import componentRender from 'shared/lib/tests/componentRender';

import AppRouter from './AppRouter';

describe('app/router/AppRouter', () => {
	test('Страница "AboutPage" отрендрилась', async () => {
		// Изоляция рендера
		componentRender(<AppRouter />, {
			route: '/about',
		});

		// findByTestId - работает асинхронно
		const page = await screen.findByTestId('AboutPage');
		expect(page).toBeInTheDocument();
	});

	test('Страница "NotFoundPage" отрендрилась', async () => {
		// Изоляция рендера
		componentRender(<AppRouter />, {
			route: '/emptypage',
		});

		const page = await screen.findByTestId('NotFoundPage');
		expect(page).toBeInTheDocument();
	});

	test('Переадресация на "MainPage"', async () => {
		// Изоляция рендера
		componentRender(<AppRouter />, {
			// без initialState
			route: '/profile/1',
		});

		const page = await screen.findByTestId('MainPage');
		expect(page).toBeInTheDocument();
	});

	test('Ролевой доступ к странице "ProfilePage"', async () => {
		// Изоляция рендера
		componentRender(<AppRouter />, {
			route: '/profile/1',
			// данные авторизации
			initialState: {
				user: { _inited: true, authData: {} },
			},
		});

		const page = await screen.findByTestId('ProfilePage');
		expect(page).toBeInTheDocument();
	});

	test('Доступ запрещен "ForbiddenPage"', async () => {
		// Изоляция рендера
		componentRender(<AppRouter />, {
			route: '/admin',
			initialState: {
				user: { _inited: true, authData: {} },
			},
		});

		const page = await screen.findByTestId('ForbiddenPage');
		expect(page).toBeInTheDocument();
	});

	test('Доступ разрешен "AdminPanelPage"', async () => {
		// Изоляция рендера
		componentRender(<AppRouter />, {
			route: '/admin',
			initialState: {
				user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
			},
		});

		const page = await screen.findByTestId('AdminPanelPage');
		expect(page).toBeInTheDocument();
	});
});

import { fireEvent, render, screen } from '@testing-library/react';

import componentRender from 'shared/lib/tests/componentRender';

import SideBar from '../ui/SideBar';

// import { withTranslation } from 'react-i18next';

describe('SideBar', () => {
	// коллекция тестов
	test('sidebar render', () => {
		// HOC i18n // You will need to pass in an i18next instance by using initReactI18next
		// const SideBarTranslation = withTranslation()(SideBar);
		// render - изолированный рендер // отдаём завернутый в хок сайдбар
		// render(<SideBarTranslation/>);

		componentRender(<SideBar />);
		// Ожидаем (селектор по ид), результат (отрендрился)
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});

	test('sidebar open|close', () => {
		componentRender(<SideBar />);
		const toogleButton = screen.getByTestId('sidebar-toogle'); // селектор
		// Ожидаем (селектор по ид), результат (отрендрился)
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
		fireEvent.click(toogleButton); // имитация нажатия
		// Ожидаем (селектор по ид), результат (наличие стайл класса)
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
	});
});

import { render, screen } from '@testing-library/react';

import { Button, ThemeButton } from './Button';

describe('Button', () => {
	// коллекция тестов
	test('button render', () => {
		// render - изолированный рендер
		render(<Button>TEST</Button>);
		// Ожидаем (селектор по тексту), результат (отрендрился)
		expect(screen.getByText('TEST')).toBeInTheDocument();
	});

	test('theme installation', () => {
		// render - изолированный рендер
		render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
		// Ожидаем (селектор по тексту), результат (наличие стайл класса)
		expect(screen.getByText('TEST')).toHaveClass('clear');
		// вывести разметку в консоль
		screen.debug();
	});
});

import { fireEvent, screen } from '@testing-library/react';

import componentRender from 'shared/lib/tests/componentRender';

import Counter from './Counter';

describe('Counter', () => {
	// коллекция тестов
	test('Check value', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		// Ожидаем (селектор по ид), результат (отрендрился)
		expect(screen.getByTestId('value-title')).toHaveTextContent('Value 10');
	});

	test('Increment', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		fireEvent.click(screen.getByTestId('increment-btn'));
		// Ожидаем (селектор по ид), результат (отрендрился)
		expect(screen.getByTestId('value-title')).toHaveTextContent('Value 11');
	});
	test('Decrement', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		fireEvent.click(screen.getByTestId('decrement-btn'));
		// Ожидаем (селектор по ид), результат (отрендрился)
		expect(screen.getByTestId('value-title')).toHaveTextContent('Value 9');
	});
});

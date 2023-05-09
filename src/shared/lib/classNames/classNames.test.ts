import classNames from '../classNames/classNames';

describe('classNames', () => {
	// коллекция тестов
	test('With only first param', () => {
		// Ожидаем, результат
		expect(classNames('someClass')).toBe('someClass');
	});

	test('With additional class', () => {
		// Ожидаем, результат
		expect(classNames('someClass', {}, ['class_1', 'class_2'])).toBe('someClass class_1 class_2');
	});

	test('With mods', () => {
		// Ожидаем, результат
		expect(classNames('someClass', { hovered: true }, ['class_1', 'class_2'])).toBe('someClass class_1 class_2 hovered');
	});

	test('With mods / false', () => {
		// Ожидаем, результат
		expect(classNames('someClass', { hovered: true, scroll: false }, ['class_1', 'class_2'])).toBe('someClass class_1 class_2 hovered');
	});

	test('With mods / undefined', () => {
		// Ожидаем, результат
		expect(classNames('someClass', { hovered: true, scroll: undefined }, ['class_1', 'class_2'])).toBe('someClass class_1 class_2 hovered');
	});
});

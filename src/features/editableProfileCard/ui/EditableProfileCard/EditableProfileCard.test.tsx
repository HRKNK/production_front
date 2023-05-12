import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Country } from 'entities/Country/public';
import { Currency } from 'entities/Currency/public';
import { type Profile } from 'entities/Profile/public';
import { $api } from 'shared/api/api';
import componentRender from 'shared/lib/tests/componentRender';

import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
	id: '1',
	first: 'admin',
	lastname: 'admin',
	age: 465,
	currency: Currency.USD,
	country: Country.Kazakhstan,
	city: 'Moscow',
	username: 'admin213',
};

const options = {
	// опции для componentRender (с какими данными работаем)
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile,
		},
		user: {
			authData: { id: '1', username: 'admin' }, // проверка на canEdit (auth.id === profile.id)
		},
	},
	asyncReducers: {
		// асинхронный редьюс
		profile: profileReducer,
	},
};

describe('features/EditableProfileCard', () => {
	// коллекция тестов
	test('Режим редактирования. Появилась кнопка отмены.', async () => {
		componentRender(<EditableProfileCard id="1" />, options); // Изолированный рендер (какой компонент рендерим)
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); // имитация нажатия (селектор)
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument(); // Ожидаем (селектор по ид), результат (отрендрился)
	});

	test('Отмена возвращает исходное состояние полей.', async () => {
		componentRender(<EditableProfileCard id="1" />, options); // Изолированный рендер (какой компонент рендерим)
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); // имитация нажатия (селектор)

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname')); // имитация очистки поля
		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user'); // имитация ввода значения
		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user'); // результат (введен: user)

		await userEvent.clear(screen.getByTestId('ProfileCard.lastname')); // имитация очистки поля
		await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user'); // имитация ввода значения
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user'); // результат (введен: user)

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton')); // имитация нажатия (селектор)

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin'); // результат (введен: admin)
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin'); // результат (введен: admin)
	});

	test('Попытка сохранить невалидные значения', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
		expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
	});

	test('PUT-запрос валидных значений', async () => {
		const mockPutReq = jest.spyOn($api, 'put');
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
		expect(mockPutReq).toHaveBeenCalled(); // мок был вызван
	});
});

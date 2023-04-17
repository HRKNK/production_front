import { validateProfileData } from './validateProfileData';

import { ValidateProfileError } from '../../consts/consts';

import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country/model/types/country';

const data = {
	username: 'Admin',
	age: 25,
	country: Country.Ukraine,
	lastname: 'Vups',
	first: 'Ups',
	city: 'Moscow',
	currency: Currency.USD,
};

describe('fetchProfileData.test', () => {
	test('success validate', async () => {
		const result = validateProfileData(data);
		expect(result).toEqual([]); // вернет пустой массив ошибок
	});

	test('mistake in first and last name', async () => { // есть ошибки валидации
		const result = validateProfileData({ ...data, lastname: '', first: '' }); // удаляем имя
		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]); // вернет массив ошибок
	});

	test('incorrect age', async () => { // есть ошибки валидации
		const result = validateProfileData({ ...data, age: undefined }); // удаляем возраст
		expect(result).toEqual([
			ValidateProfileError.INCORRECT_AGE,
		]); // вернет массив ошибок
	});

	test('incorrect country', async () => { // есть ошибки валидации
		const result = validateProfileData({ ...data, country: undefined }); // удаляем страну
		expect(result).toEqual([
			ValidateProfileError.INCORRECT_COUNTRY,
		]); // вернет массив ошибок
	});

	test('all errors', async () => { // есть ошибки валидации
		const result = validateProfileData({});
		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY,
		]); // вернет массив ошибок
	});
});

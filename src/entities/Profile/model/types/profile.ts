import { type Country } from 'entities/Country/public';
import { type Currency } from 'entities/Currency/public';

export enum ValidateProfileError {
	NO_DATA = 'NO_DATA',
	INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
	INCORRECT_AGE = 'INCORRECT_AGE',
	INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
	INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
	INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
	SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
	first?: string;
	lastname?: string;
	age?: number;
	currency?: Currency; // ENUM
	country?: Country; // ENUM
	city?: string;
	username?: string;
	avatar?: string;
}

export interface ProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateError?: ValidateProfileError[];
}

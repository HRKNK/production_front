import { type Profile } from 'entities/Profile/public';

export enum ValidateProfileError {
	NO_DATA = 'NO_DATA',
	INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
	INCORRECT_AGE = 'INCORRECT_AGE',
	INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
	INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
	INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
	SERVER_ERROR = 'SERVER_ERROR',
}

export interface ProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateError?: ValidateProfileError[];
}

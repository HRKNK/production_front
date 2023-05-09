import { type Profile } from 'entities/Profile/public';

import { type ValidateProfileError } from '../consts/consts';

export interface ProfileSchema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateError?: ValidateProfileError[];
}

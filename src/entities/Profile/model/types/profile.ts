import { type Country } from 'entities/Country/public';
import { type Currency } from 'entities/Currency/public';

export interface Profile {
	id?: string;
	first?: string;
	lastname?: string;
	age?: number;
	currency?: Currency; // ENUM
	country?: Country; // ENUM
	city?: string;
	username?: string;
	avatar?: string;
}

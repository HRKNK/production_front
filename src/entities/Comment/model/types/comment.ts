import { type User } from 'entities/User/public';

export interface Comment {
	id: string;
	user: User;
	text: string;
}

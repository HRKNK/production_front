import { type counterSchema } from 'entities/Counter/public';
import { type UserSchema } from 'entities/User/public';
import { type LoginSchema } from 'features/AuthByUserName/public';

export interface StateSchema {
	counter: counterSchema;
	user: UserSchema;
	loginForm?: LoginSchema;
}

import { type counterSchema } from 'entities/Counter/public';
import { type UserSchema } from 'entities/User/public';

export interface StateSchema {
	counter: counterSchema;
	user: UserSchema;
}

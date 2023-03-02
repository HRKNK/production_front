import { type StateSchema } from 'entities/Counter/public';

export const getCounter = (state: StateSchema) => {
	return state.counter;
};

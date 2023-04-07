import { type StateSchema } from 'app/providers/storeProvider/public';

export const getCounter = (state: StateSchema) => {
	return state.counter;
};

import { counterReducer } from './model/slice/counterSlice';
import { type counterSchema } from './model/types/counterSchema';
import Counter from './ui/Counter';

import { type StateSchema } from 'app/providers/storeProvider/config/stateSchema';

export {
	type counterSchema, Counter, counterReducer, type StateSchema,
};

import { counterReducer, counterActions } from './counterSlice';

import { type counterSchema } from '../types/counterSchema';

describe('counterReducer', () => {
	test('decrement', () => {
		const state: counterSchema = {
			value: 10,
		};
		expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
	});

	test('increment', () => {
		const state: counterSchema = {
			value: 10,
		};
		expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
	});

	test('Should work with empty state', () => {
		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
	});
});

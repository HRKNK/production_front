import { getCounter } from './getCounter';

import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from 'entities/Counter/public';

describe('getCounter', () => {
	test('return counter value (object)', () => {
		const state: DeepPartial<StateSchema> = { // зарезервированный тип позволяющий игнорировать поля
			counter: {
				value: 10,
			},
		};
		expect(getCounter(state as StateSchema)).toEqual({ value: 10 }); // as приводит к типу (избегаем ТС ошибки использования DeepPartial)
	});
});

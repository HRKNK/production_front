import { type StateSchema } from 'app/providers/storeProvider/public';

import { getCounter } from './getCounter';

// import { type DeepPartial } from '@reduxjs/toolkit';

describe('getCounter', () => {
	test('return counter value (object)', () => {
		const state: DeepPartial<StateSchema> = {
			// зарезервированный тип позволяющий игнорировать поля
			counter: {
				value: 10,
			},
		};
		expect(getCounter(state as StateSchema)).toEqual({ value: 10 }); // as приводит к типу (избегаем ТС ошибки использования DeepPartial)
	});
});

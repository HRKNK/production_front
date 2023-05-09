import { type StateSchema } from 'app/providers/storeProvider/public';

import { getCounterValue } from './getCounterValue';

// import { type DeepPartial } from '@reduxjs/toolkit';

describe('getCounterValue', () => {
	test('return counter value (number)', () => {
		const state: DeepPartial<StateSchema> = {
			// зарезервированный тип позволяющий игнорировать поля
			counter: {
				value: 10,
			},
		};
		expect(getCounterValue(state as StateSchema)).toEqual(10); // as приводит к типу (избегаем ТС ошибки использования DeepPartial)
	});
});

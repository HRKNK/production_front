import { createSelector } from '@reduxjs/toolkit';

import { buildSelector } from 'shared/lib/store/public';

import { type counterSchema } from '../../types/counterSchema';
import { getCounter } from '../getCounter/getCounter';

// export const getCounterValue = createSelector(getCounter, (counter: counterSchema) => counter.value);
export const [useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value);

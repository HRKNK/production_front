import { getCounter } from '../getCounter/getCounter';

import { type counterSchema } from '../../types/counterSchema';

import { createSelector } from '@reduxjs/toolkit';

export const getCounterValue = createSelector(getCounter, (counter: counterSchema) => counter.value);

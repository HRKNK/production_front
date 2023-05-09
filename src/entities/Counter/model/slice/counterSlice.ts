import { createSlice } from '@reduxjs/toolkit';

import { type counterSchema } from '../types/counterSchema';

const initialState: counterSchema = {
	// типизация для initialState в обход дженерика createSlice<Generic>
	value: 0,
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
	},
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;

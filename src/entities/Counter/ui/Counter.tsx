import { counterActions } from '../model/slice/counterSlice';

import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type StateSchema } from 'app/providers/storeProvider/config/stateSchema';

const Counter = () => {
	const dispatch = useDispatch(); // закидываем action в reducer
	// const counterValue = useSelector((state: StateSchema) => state.counter.value); // достаём данные
	const counterValue = useSelector(getCounterValue); // достаём данные

	const increment = () => {
		dispatch(counterActions.increment());
	};

	const decrement = () => {
		dispatch(counterActions.decrement());
	};

	return (
		<div>
			<h1 data-testid='value-title'>Value {counterValue}</h1>
			<button data-testid='increment-btn' onClick={increment}>Increment</button>
			<button data-testid='decrement-btn' onClick={decrement}>Decrement</button>
		</div>
	);
};

export default Counter;

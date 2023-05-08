/* eslint-disable custom-plugin/layer-imports */
import { type StateSchema } from 'app/providers/storeProvider/public';
import { useSelector } from 'react-redux';

type Selector<T> = (state: StateSchema) => T; // типизация селектора
type Result<T> = [() => T, Selector<T>]; // типизация массива результата

export function buildSelector<T> (selector: Selector<T>): Result<T> {
	const useSelectorHook = () => {
		return useSelector(selector); // в useSelector передаём свой selector
	};

	return [useSelectorHook, selector];
}

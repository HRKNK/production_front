import { type MutableRefObject, useCallback, useRef } from 'react';

// Запуск события через задержку (отложенный запуск)
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	const timer = useRef() as MutableRefObject<any>;

	return useCallback(
		(...args: any[]) => {
			if (timer.current) {
				// если таймер уже активен
				clearTimeout(timer.current); // очищаем
			}
			timer.current = setTimeout(() => {
				// запускаем новый таймер отложенного запуска
				// eslint-disable-next-line n/no-callback-literal
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);
}

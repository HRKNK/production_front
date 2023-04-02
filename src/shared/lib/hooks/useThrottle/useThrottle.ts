import { useCallback, useRef } from 'react';

// (само событие, таймер-задержка в мс)
export function useThrottle (callback: (...args: any[]) => void, delay: number) {
	const throttleRef = useRef(false); // init value

	return useCallback((...args: any[]) => {
		if (!throttleRef.current) {
			// eslint-disable-next-line n/no-callback-literal
			callback(...args); // вызвали функцию
			throttleRef.current = true;

			setTimeout(() => {
				throttleRef.current = false;
			}, delay);
		}
	}, [callback, delay]);
}

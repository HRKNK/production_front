import { type MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
	callback?: () => void; // вызывается при пересечении элемента
	triggerRef: MutableRefObject<HTMLElement>; // зарезервированный ref тип <>
	wrapperRef: MutableRefObject<HTMLElement>; // зарезервированный ref тип <>
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// Замкнули переменные
		const wrapperElement = wrapperRef.current; // Область просмотра (null? - следит за окном браузера)
		const triggerElement = triggerRef.current; // Элемент, который будет наблюдаться

		if (callback) {
			const options = {
				// дэфолтные настройки АПИ | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
				root: wrapperElement,
				rootMargin: '20px', // Отступы вокруг root (обязательно при наличии root)
				threshold: 1.0,
			};

			observer.current = new IntersectionObserver(([entry]) => {
				// массив отслеживаемых объектов
				if (entry.isIntersecting) {
					// объект появился в области видимости
					callback();
				}
			}, options);

			observer.current.observe(triggerElement); // метод устанавливает слежение за указанным элементом из дома
		}

		return () => {
			// демонтирование наблюдения / отписываемся
			if (observer.current && triggerElement) {
				// triggerElement - избавляет от null ошибки
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.current.unobserve(triggerElement);
			}
		};
	}, [callback, triggerRef, wrapperRef]);
}

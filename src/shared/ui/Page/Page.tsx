/* eslint-disable react/display-name */
import cls from './Page.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { memo, MutableRefObject, type ReactNode, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
	className?: string;
	children: ReactNode; // сам Page
	onScrollEnd?: () => void;
}

// Обертка над Pages
export const Page = memo((props: PageProps) => {
	const { className, children, onScrollEnd } = props;
	const wrapperRef = useRef();
	const triggerRef = useRef();

	useInfiniteScroll({ // бесконечная пагинация
		triggerRef, // Элемент, который будет наблюдаться
		wrapperRef, // Область просмотра (null? - следит за окном браузера)
		callback: onScrollEnd,
	});

	return (
		<section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
			{children} {/* сам Page */}
			<div ref={triggerRef} /> {/* объект слежки */}
		</section>
	);
});

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable react/display-name */
import cls from './Page.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { memo, type ReactNode, useRef, type UIEvent, useLayoutEffect, type MutableRefObject } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUIScrollByPath, scrollSaveActions } from 'features/ScrollSave/public';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { type StateSchema } from 'entities/Counter/public';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

interface PageProps {
	className?: string;
	children: ReactNode; // сам Page
	onScrollEnd?: () => void;
}

// Обертка над Pages
export const Page = memo((props: PageProps) => {
	const { className, children, onScrollEnd } = props;
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();

	useInfiniteScroll({ // бесконечная пагинация
		triggerRef, // Элемент, который будет наблюдаться
		wrapperRef, // Область просмотра (null? - следит за окном браузера)
		callback: onScrollEnd,
	});

	// сохранение скролла
	const { pathname } = useLocation(); // путь до текущей страницы (берем для сохранения скролла)
	const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));
	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	});
	// useThrottle - задержка запуска
	const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
		dispatch(scrollSaveActions.setScrollPosition({ path: pathname, position: event.currentTarget.scrollTop }));
	}, 250);

	return (
		<section onScroll={onScroll} ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
			{children} {/* сам Page */}
			<div ref={triggerRef} /> {/* объект слежки */}
		</section>
	);
});

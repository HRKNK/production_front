/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable react/display-name */
import { type MutableRefObject, type ReactNode, type UIEvent, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { type StateSchema } from 'app/providers/storeProvider/public';
import { getUIScrollByPath, scrollSaveActions } from 'features/ScrollSave/public';
import classNames from 'shared/lib/classNames/classNames';
import { toggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { type TestProps } from 'shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
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

	useInfiniteScroll({
		// бесконечная пагинация
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
		<main
			data-testid={props['data-testid'] ?? 'Page'}
			onScroll={onScroll}
			ref={wrapperRef}
			// Фича-флаг под редизайн
			className={classNames(
				toggleFeatures({
					name: 'isAppRedesigned',
					on: () => cls.PageRedesigned,
					off: () => cls.Page,
				}),
				{},
				[className]
			)}
		>
			{children} {/* сам Page */}
			{onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null} {/* объект слежки */}
		</main>
	);
});

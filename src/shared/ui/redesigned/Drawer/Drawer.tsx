/* eslint-disable react/display-name */
import React, { type ReactNode, memo, useCallback, useEffect } from 'react';

import { useTheme } from 'app/providers/ThemeProvider/public';
import classNames, { type Mods } from 'shared/lib/classNames/classNames';
import { AnimationProvider, useAnimationLibs } from 'shared/lib/components/AnimationProvider/public';
import { toggleFeatures } from 'shared/lib/features/public';

import { Overlay } from '../Overlay/Overlay';
import Portal from '../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const height = window.innerHeight - 100; // высота окна

const DrawerContent = memo((props: DrawerProps) => {
	const { Spring, Gesture } = useAnimationLibs(); // лениво загруженные библиотеки
	const { className, children, onClose, isOpen } = props;
	const { theme } = useTheme();

	const mods: Mods = {
		[cls.opened]: isOpen,
	};

	const [{ y }, api] = Spring.useSpring(() => ({ y: 80 }));

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false }); // запуск анимации
	}, [api]);

	useEffect(() => {
		if (isOpen) {
			openDrawer();
		}
	}, [api, isOpen, openDrawer]);

	const close = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onClose,
		});
	};

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
			if (my < -70) cancel();

			if (last) {
				if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
					close();
				} else {
					openDrawer();
				}
			} else {
				api.start({ y: my, immediate: true });
			}
		},
		{
			from: () => [0, y.get()],
			filterTaps: true,
			bounds: { top: 0 },
			rubberband: true,
		}
	);

	if (!isOpen) {
		return null;
	}

	const display = y.to((py) => (py < height ? 'block' : 'none'));

	return (
		<Portal element={document.getElementById('app') ?? document.body}>
			<div
				className={classNames(cls.Drawer, mods, [
					className,
					theme,
					'app_drawer',
					toggleFeatures({
						name: 'isAppRedesigned',
						on: () => cls.drawerNew,
						off: () => cls.drawerOld,
					}),
				])}
			>
				<Overlay onClick={onClose} />
				{/* <div className={cls.content}>
					{children}
				</div> */}

				<Spring.a.div className={cls.sheet} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }} {...bind()}>
					{children}
				</Spring.a.div>
			</div>
		</Portal>
	);
});

const DrawerAsync = (props: DrawerProps) => {
	// Тут ждем загрузки библиотек
	const { isLoaded } = useAnimationLibs();

	if (!isLoaded) {
		return <>Загрузка...</>;
	}

	return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
	// Завернут в провайдер
	return (
		<AnimationProvider>
			<DrawerAsync {...props} />
		</AnimationProvider>
	);
};

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React, { type MutableRefObject, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from 'app/providers/ThemeProvider/public';
import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import { Overlay } from '../../Overlay/Overlay';
import Portal from '../../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
const Modal = (props: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	// useRef<ReturnType<typeof setTimeout> | null>()
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>; // явное преобразование к <>

	const { theme } = useTheme();

	const { className, children, isOpen, onClose, lazy } = props;
	const mods: Mods = {
		// Record<string, boolean | undefined>
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const closeHandler = useCallback(() => {
		// useCallback - мемомизирует функцию
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, 300);
		}
	}, [onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			// useCallback - мемомизирует функцию
			if (e.key === 'Escape') {
				closeHandler();
			}
		},
		[closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}
		return () => {
			// очистка таймера
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	// const onContentClick = (event: React.MouseEvent) => {
	// 	event.stopPropagation();
	// };

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
				<Overlay className={cls.overlay} onClick={closeHandler} />
				<div className={cls.content}>
					{' '}
					{/* onClick={onContentClick} */}
					{children}
				</div>
			</div>
		</Portal>
	);
};

export default Modal;

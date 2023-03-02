import cls from './Modal.module.scss';

import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import Portal from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider/public';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const Modal = (props: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const { theme } = useTheme();

	const { className, children, isOpen, onClose } = props;
	const mods: Record<string, boolean> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	};

	const closeHandler = useCallback(() => { // useCallback - мемомизирует функцию
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, 300);
		}
	}, [onClose]);

	const onKeyDown = useCallback((e: KeyboardEvent) => { // useCallback - мемомизирует функцию
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}
		return () => { // очистка таймера
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	const onContentClick = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className, theme])}>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;

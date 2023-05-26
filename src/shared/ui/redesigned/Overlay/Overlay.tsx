import { memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
	className?: string;
	onClick?: () => void;
}

// eslint-disable-next-line react/display-name
export const Overlay = memo((props: OverlayProps) => {
	// Компонент затемнения
	const { className, onClick } = props;

	return <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />;
});

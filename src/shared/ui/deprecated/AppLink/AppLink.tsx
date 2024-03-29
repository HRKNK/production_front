/* eslint-disable react/display-name */
import React, { type ReactNode, memo } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

// enum = перечисление
export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
	// расширяем типы пропсов для Link (зарезервированный тип)
	className?: string;
	theme?: AppLinkTheme;
	children?: ReactNode;
}

// FC позволяет вытащить children пропс + дженерик <AppLinkProps>
// const AppLink: FC<AppLinkProps> = (props) => {

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const AppLink = memo((props: AppLinkProps) => {
	const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;
	return (
		<Link to={to} {...otherProps} className={classNames(cls.applink, {}, [className, cls[theme]])}>
			{children}
		</Link>
	);
});

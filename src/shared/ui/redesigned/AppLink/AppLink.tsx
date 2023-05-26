/* eslint-disable react/display-name */
import React, { type ReactNode, memo } from 'react';
import { type LinkProps, NavLink } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

// Юнион
export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
	// расширяем типы пропсов для Link (зарезервированный тип)
	className?: string;
	variant?: AppLinkVariant;
	children?: ReactNode;
	activeClassName?: string;
}

// FC позволяет вытащить children пропс + дженерик <AppLinkProps>
// const AppLink: FC<AppLinkProps> = (props) => {
export const AppLink = memo((props: AppLinkProps) => {
	const { to, className, children, variant = 'primary', activeClassName = '', ...otherProps } = props;
	return (
		// NavLink поддерживает состояние isActive
		<NavLink
			to={to}
			{...otherProps}
			className={({ isActive }) => classNames(cls.AppLink, { [activeClassName]: isActive }, [className, cls[variant]])}
		>
			{children}
		</NavLink>

		// <Link to={to} {...otherProps} className={classNames(cls.applink, {}, [className, cls[variant]])}>
		// 	{children}
		// </Link>
	);
});

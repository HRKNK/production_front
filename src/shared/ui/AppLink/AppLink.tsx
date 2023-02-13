import cls from './AppLink.module.scss';

import React, { type FC } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';

// enum = перечисление
export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps { // расширяем типы пропсов для Link (зарезервированный тип)
	className?: string;
	theme?: AppLinkTheme;
}

// FC позволяет вытащить children пропс + дженерик <AppLinkProps>
const AppLink: FC<AppLinkProps> = (props) => {
	const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;
	return (
		<Link to={to} {...otherProps} className={classNames(cls.applink, {}, [className, cls[theme]])}>
			{children}
		</Link>
	);
};

export default AppLink;

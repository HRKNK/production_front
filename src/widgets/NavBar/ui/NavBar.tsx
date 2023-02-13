import cls from './NavBar.module.scss';

import React from 'react';
// import { Link } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
	className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
	return (
		<div className={classNames(cls.navbar, {}[className])}>
			<div className={cls.links}>
				{/* переходы по страницам(отменяет явление перезагрузки)
				<Link to={'/'} className={cls.link}>Главная</Link>
				<Link to={'/about'} className={cls.link}>О сайте</Link> */}
				<AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={cls.link}>Главная</AppLink>
				<AppLink to={'/about'} className={cls.link}>О сайте</AppLink>
			</div>
		</div>
	);
};

export default NavBar;

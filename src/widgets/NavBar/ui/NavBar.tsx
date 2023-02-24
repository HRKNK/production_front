import cls from './NavBar.module.scss';

import React from 'react';
// import { Link } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';
// import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
	className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
	return (
		<div className={classNames(cls.navbar, {}[className])}>
			<div className={cls.links}>
				{/*  */}
			</div>
		</div>
	);
};

export default NavBar;

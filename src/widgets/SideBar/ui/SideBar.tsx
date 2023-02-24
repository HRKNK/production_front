import cls from './SideBar.module.scss';

import React, { useState } from 'react';

import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/public';

import classNames from 'shared/lib/classNames/classNames';
import LangSwither from 'features/ui/LangSwither/LangSwither';
import { BugButton } from 'app/providers/ErrorBoundary/public';
import Button, { ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig';

import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';

interface SideBarProps {
	className?: string;
}

const SideBar = ({ className }: SideBarProps) => {
	const [collapsed, setCollapsed] = useState(true);
	const toggle = () => {
		setCollapsed(prev => !prev);
	};

	return (
		<div data-testid='sidebar' className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>

			<BugButton></BugButton>

			<Button
				data-testid='sidebar-toogle'
				theme={ThemeButton.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				className={cls.collapsedBtn}
				onClick={toggle}
				square
			>{collapsed ? '<' : '>'}
			</Button>

			<div className={cls.items}>
				{/* переходы по страницам(отменяет явление перезагрузки)
				<Link to={'/'} className={cls.link}>Главная</Link>
				<Link to={'/about'} className={cls.link}>О сайте</Link> */}
				<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.main} className={cls.item}>
					<MainIcon className={cls.icon}/>
					<span className={cls.link}>Главная</span>
				</AppLink>
				<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.about} className={cls.item}>
					<AboutIcon className={cls.icon}/>
					<span className={cls.link}>О сайте</span>
				</AppLink>
			</div>

			<div className={cls.switchers}>
				<ThemeSwitcher></ThemeSwitcher>
				<LangSwither short={collapsed} className={cls.lang}></LangSwither>
			</div>

		</div>
	);
};

export default SideBar;

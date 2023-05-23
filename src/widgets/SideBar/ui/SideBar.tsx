/* eslint-disable react/display-name */
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { BugButton } from 'app/providers/ErrorBoundary/public';
import LangSwither from 'features/LangSwither/LangSwither';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { AppLogo } from 'shared/ui/AppLogo/public';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/public';
import { VStack } from 'shared/ui/Stack/public';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/public';

import { getSideBarItems } from '../model/selectors/getSideBarItems';
import cls from './SideBar.module.scss';
import { SidebarItem } from './SidebarItem/SidebarItem';

interface SideBarProps {
	className?: string;
}

const SideBar = memo(({ className }: SideBarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const sideBarItemsList = useSelector(getSideBarItems); // список навигационных ссылок
	const toggle = () => {
		setCollapsed((prev) => !prev);
	};

	// const itemList = useMemo(() => {
	// 	return SidebarItemsList.map((item, id) => <SidebarItem key={id} item={item} collapsed={collapsed}></SidebarItem>);
	// }, [collapsed]);

	// Фича-флаг
	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			off={
				<section data-testid="sidebar" className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
					<BugButton></BugButton>

					<Button
						data-testid="sidebar-toogle"
						theme={ThemeButton.BACKGROUND_INVERTED}
						size={ButtonSize.L}
						className={cls.collapsedBtn}
						onClick={toggle}
						square
					>
						{collapsed ? '<' : '>'}
					</Button>

					<VStack role="navigation" gap={'8'} className={cls.items}>
						{sideBarItemsList.map((item, id) => (
							<SidebarItem key={id} item={item} collapsed={collapsed}></SidebarItem>
						))}
					</VStack>

					<div className={cls.switchers}>
						<ThemeSwitcher></ThemeSwitcher>
						<LangSwither short={collapsed} className={cls.lang}></LangSwither>
					</div>
				</section>
			}
			on={
				<section data-testid="sidebar" className={classNames(cls.sidebarRedesigned, { [cls.collapsed]: collapsed }, [className])}>
					<AppLogo className={cls.appLogo} />
				</section>
			}
		/>
	);

	// Перенесено в фича-флаг
	// return (
	// 	<section data-testid="sidebar" className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
	// 		<BugButton></BugButton>

	// 		<Button
	// 			data-testid="sidebar-toogle"
	// 			theme={ThemeButton.BACKGROUND_INVERTED}
	// 			size={ButtonSize.L}
	// 			className={cls.collapsedBtn}
	// 			onClick={toggle}
	// 			square
	// 		>
	// 			{collapsed ? '<' : '>'}
	// 		</Button>

	// 		<VStack role="navigation" gap={'8'} className={cls.items}>
	// 			{/* переходы по страницам(отменяет явление перезагрузки)
	// 			<Link to={'/'} className={cls.link}>Главная</Link>
	// 			<Link to={'/about'} className={cls.link}>О сайте</Link> */}
	// 			{/* <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.main} className={cls.item}>
	// 				<MainIcon className={cls.icon}/>
	// 				<span className={cls.link}>Главная</span>
	// 			</AppLink>
	// 			<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.about} className={cls.item}>
	// 				<AboutIcon className={cls.icon}/>
	// 				<span className={cls.link}>О сайте</span>
	// 			</AppLink> */}
	// 			{sideBarItemsList.map((item, id) => (
	// 				<SidebarItem key={id} item={item} collapsed={collapsed}></SidebarItem>
	// 			))}
	// 		</VStack>

	// 		<div className={cls.switchers}>
	// 			<ThemeSwitcher></ThemeSwitcher>
	// 			<LangSwither short={collapsed} className={cls.lang}></LangSwither>
	// 		</div>
	// 	</section>
	// );
});

export default SideBar;

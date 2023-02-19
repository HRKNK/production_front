import cls from './SideBar.module.scss';

import React, { useState } from 'react';

import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/public';

import classNames from 'shared/lib/classNames/classNames';
import LangSwither from 'features/ui/LangSwither/LangSwither';
import { BugButton } from 'app/providers/ErrorBoundary/public';
import Button from 'shared/ui/Button/Button';

interface SideBarProps {
	className?: string;
}

const SideBar = ({ className }: SideBarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const toggle = () => {
		setCollapsed(prev => !prev);
	};

	return (
		<div data-testid='sidebar' className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
			<Button data-testid='sidebar-toogle' onClick={toggle}>Button</Button>

			<BugButton></BugButton>

			<div className={cls.switchers}>
				<ThemeSwitcher></ThemeSwitcher>
				<LangSwither className={cls.lang}></LangSwither>
			</div>

		</div>
	);
};

export default SideBar;

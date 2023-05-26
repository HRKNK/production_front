import { type ReactElement } from 'react';

import classNames from 'shared/lib/classNames/classNames';

import cls from './MainLayout.module.scss';

interface MainLayoutProps {
	className?: string;
	header: ReactElement;
	content: ReactElement;
	sidebar: ReactElement;
	toolbar?: ReactElement;
}

// Главный каркас контента
export const MainLayout = (props: MainLayoutProps) => {
	const { className, content, toolbar, header, sidebar } = props;

	// Состовные части
	return (
		<div className={classNames(cls.MainLayout, {}, [className])}>
			<div className={cls.content}>{content}</div>
			<div className={cls.sidebar}>{sidebar}</div>
			<div className={cls.rightbar}>
				<div className={cls.header}>{header}</div>
				<div className={cls.toolbar}>{toolbar}</div>
			</div>
		</div>
	);
};
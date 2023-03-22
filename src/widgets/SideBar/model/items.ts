import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';

import { RoutePath } from 'shared/config/routeConfig';

import type React from 'react';

export interface SidebarItemType {
	path: string;
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>; // SVG type из глобал тс
	text: string;
	authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
	{
		path: RoutePath.main,
		Icon: MainIcon,
		text: 'Главная',
	},
	{
		path: RoutePath.about,
		Icon: AboutIcon,
		text: 'О сайте',
	},
	{
		path: RoutePath.profile,
		Icon: ProfileIcon,
		text: 'Профиль',
		authOnly: true,
	},
	{
		path: RoutePath.articles,
		Icon: ArticleIcon,
		text: 'Статья',
		authOnly: true,
	},
];

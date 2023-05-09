import { createSelector } from '@reduxjs/toolkit';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getUserAuthData } from 'entities/User/public';
import AboutIcon from 'shared/assets/icons/about.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

import { type SidebarItemType } from '../types/items';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
	const sidebarItemsList: SidebarItemType[] = [
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
	];

	if (userData) {
		// как authOnly / пользователь авторизован
		sidebarItemsList.push(
			{
				path: RoutePath.profile + userData.id,
				Icon: ProfileIcon,
				text: 'Профиль',
				authOnly: true,
			},
			{
				path: RoutePath.articles,
				Icon: ArticleIcon,
				text: 'Статья',
				authOnly: true,
			}
		);
	}

	return sidebarItemsList;
});

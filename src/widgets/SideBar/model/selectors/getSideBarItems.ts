import { createSelector } from '@reduxjs/toolkit';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getUserAuthData } from 'entities/User/public';
import AboutIcon from 'shared/assets/icons/Info.svg';
import AboutIconDeprecated from 'shared/assets/icons/about.svg';
import ArticleIcon from 'shared/assets/icons/article-new.svg';
import ArticleIconDeprecated from 'shared/assets/icons/article.svg';
import ProfileIcon from 'shared/assets/icons/avatar.svg';
import MainIcon from 'shared/assets/icons/home.svg';
import MainIconDeprecated from 'shared/assets/icons/main.svg';
import ProfileIconDeprecated from 'shared/assets/icons/profile.svg';
import { toggleFeatures } from 'shared/lib/features/public';

import { type SidebarItemType } from '../types/items';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: RoutePath.main,
			Icon: toggleFeatures({
				name: 'isAppRedesigned',
				off: () => MainIconDeprecated,
				on: () => MainIcon,
			}),
			text: 'Главная',
		},
		{
			path: RoutePath.about,
			Icon: toggleFeatures({
				name: 'isAppRedesigned',
				off: () => AboutIconDeprecated,
				on: () => AboutIcon,
			}),
			text: 'О сайте',
		},
	];

	if (userData) {
		// как authOnly / пользователь авторизован
		sidebarItemsList.push(
			{
				path: RoutePath.profile + userData.id,
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => ProfileIconDeprecated,
					on: () => ProfileIcon,
				}),
				text: 'Профиль',
				authOnly: true,
			},
			{
				path: RoutePath.articles,
				Icon: toggleFeatures({
					name: 'isAppRedesigned',
					off: () => ArticleIconDeprecated,
					on: () => ArticleIcon,
				}),
				text: 'Статья',
				authOnly: true,
			}
		);
	}

	return sidebarItemsList;
});

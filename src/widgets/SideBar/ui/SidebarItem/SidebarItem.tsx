/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from 'entities/User/public';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from 'shared/ui/deprecated/AppLink/public';
import { AppLink } from 'shared/ui/redesigned/AppLink/public';
import { Icon } from 'shared/ui/redesigned/Icon/public';

import { type SidebarItemType } from '../../model/types/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType;
	collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
	const { t } = useTranslation();
	const isAuth = useSelector(getUserAuthData);

	if (item.authOnly && !isAuth) {
		return null;
	}

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			off={
				<AppLinkDeprecated theme={AppLinkTheme.SECONDARY} to={item.path} className={classNames(cls.item, { [cls.collapsed]: collapsed })}>
					<item.Icon className={cls.icon} />
					<span className={cls.link}>{t(item.text)}</span>
				</AppLinkDeprecated>
			}
			on={
				<AppLink activeClassName={cls.active} to={item.path} className={classNames(cls.itemRedesigned, { [cls.collapsedRedesigned]: collapsed })}>
					<Icon Svg={item.Icon} />
					<span className={cls.link}>{t(item.text)}</span>
				</AppLink>
			}
		/>
	);

	// return (
	// 	<AppLink theme={AppLinkTheme.SECONDARY} to={item.path} className={classNames(cls.item, { [cls.collapsed]: collapsed })}>
	// 		<item.Icon className={cls.icon} />
	// 		<span className={cls.link}>{t(item.text)}</span>
	// 	</AppLink>
	// );
});

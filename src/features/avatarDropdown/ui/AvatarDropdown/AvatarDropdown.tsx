/* eslint-disable react/display-name */
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User/public';
import { ToggleFeatures } from 'shared/lib/features/public';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/public';
import { Dropdown as DropdownDeprecate } from 'shared/ui/deprecated/Dropdown/public';
import { Avatar } from 'shared/ui/redesigned/Avatar/public';
import { Dropdown } from 'shared/ui/redesigned/Dropdown/public';

interface AvatarDropdownProps {
	className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const isAdmin = useSelector(isUserAdmin);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	const isManager = useSelector(isUserManager);
	const authData = useSelector(getUserAuthData);
	const isAdminPanelAvailable = isAdmin || isManager;

	if (!authData) {
		return null;
	}

	const items = [
		// ссылки
		...(isAdminPanelAvailable
			? [
					{
						content: t('Админка'),
						href: RoutePath.admin_panel,
					},
			  ]
			: []),
		{
			content: t('Профиль'),
			href: RoutePath.profile + authData.id,
		},
		{
			content: t('Настройки'),
			href: RoutePath.settings,
		},
		{
			content: t('Выйти'),
			onClick: onLogout,
		},
	];

	return (
		<ToggleFeatures
			feature={'isArticleRatingEnabled'}
			on={<Dropdown direction={'bottom left'} items={items} trigger={<Avatar size={40} src={authData.avatar} />} />}
			off={<DropdownDeprecate direction={'bottom left'} items={items} trigger={<AvatarDeprecated size={30} src={authData.avatar} />} />}
		/>
	);

	// return <Dropdown direction={'bottom left'} items={items} trigger={<Avatar size={30} src={authData.avatar} />} />;
});

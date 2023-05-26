/* eslint-disable react/display-name */
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User/public';
import { Avatar } from 'shared/ui/deprecated/Avatar/public';
import { Dropdown } from 'shared/ui/deprecated/Dropdown/public';

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

	return (
		<Dropdown
			direction={'bottom left'}
			items={[
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
					content: t('Выйти'),
					onClick: onLogout,
				},
				{
					content: t('Профиль'),
					href: RoutePath.profile + authData.id,
				},
			]}
			trigger={<Avatar size={30} src={authData.avatar} />}
		/>
	);
});

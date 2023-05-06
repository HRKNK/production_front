/* eslint-disable react/display-name */
import cls from './NavBar.module.scss';

import React, { memo, useCallback, useState } from 'react';
// import { Link } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/public';
import { LoginModal } from 'features/AuthByUserName/public';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User/public';
import { Text } from 'shared/ui/Text/public';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/public';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { HStack } from 'shared/ui/Stack/public';
import { NotificationButton } from 'features/notificationButton/ui/NotificationButton/NotificationButton';
import { AvatarDropdown } from 'features/avatarDropdown/public';
// import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
	className?: string;
}

const NavBar = memo(({ className }: NavBarProps) => {
	const [isAuthModal, setisAuthModal] = useState(false);
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => {
		setisAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setisAuthModal(true);
	}, []);

	if (authData) {
		return (
			<header className={classNames(cls.navbar, {}, [className])}>
				<Text className={cls.appName} title='APP'></Text>
				<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.articles_create}>
					{t('Создать статью')}
				</AppLink>
				<HStack gap='16'className={cls.dropdown}>
					{/* Список уведомлений */}
					<NotificationButton/>
					{/* Выпадающий список ссылок */}
					<AvatarDropdown/>
				</HStack>
				{/* <Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onLogout}>
					{t('Выйти')}
				</Button> */}
			</header>
		);
	}

	return (
		<header className={classNames(cls.navbar, {}, [className])}>
			<Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onShowModal}>
				{t('Войти')}
			</Button>
			{ isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}></LoginModal>}
		</header>
	);
});

export default NavBar;

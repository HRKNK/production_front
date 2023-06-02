/* eslint-disable react/display-name */
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getUserAuthData } from 'entities/User/public';
import { LoginModal } from 'features/AuthByUserName/public';
import { AvatarDropdown } from 'features/avatarDropdown/public';
import { NotificationButton } from 'features/notificationButton/public';
// import { Link } from 'react-router-dom';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from 'shared/lib/features/public';
import { AppLink, AppLinkTheme } from 'shared/ui/deprecated/AppLink/public';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Text } from 'shared/ui/deprecated/Text/public';
import { Button } from 'shared/ui/redesigned/Button/public';
import { HStack } from 'shared/ui/redesigned/Stack/public';

import cls from './NavBar.module.scss';

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

	const mainClass = toggleFeatures({
		name: 'isAppRedesigned',
		on: () => cls.navbarRedesigned,
		off: () => cls.navbar,
	});

	if (authData) {
		return (
			<ToggleFeatures
				feature="isAppRedesigned"
				on={
					<header className={classNames(mainClass, {}, [className])}>
						<HStack gap="16" className={cls.dropdown}>
							{/* Список уведомлений */}
							<NotificationButton />
							{/* Выпадающий список ссылок */}
							<AvatarDropdown />
						</HStack>
					</header>
				}
				off={
					<header className={classNames(mainClass, {}, [className])}>
						<Text className={cls.appName} title="APP"></Text>
						<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.articles_create}>
							{t('Создать статью')}
						</AppLink>
						<HStack gap="16" className={cls.dropdown}>
							{/* Список уведомлений */}
							<NotificationButton />
							{/* Выпадающий список ссылок */}
							<AvatarDropdown />
						</HStack>
					</header>
				}
			/>
			// <header className={classNames(cls.navbar, {}, [className])}>
			// 	<Text className={cls.appName} title="APP"></Text>
			// 	<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.articles_create}>
			// 		{t('Создать статью')}
			// 	</AppLink>
			// 	<HStack gap="16" className={cls.dropdown}>
			// 		{/* Список уведомлений */}
			// 		<NotificationButton />
			// 		{/* Выпадающий список ссылок */}
			// 		<AvatarDropdown />
			// 	</HStack>
			// 	{/* <Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onLogout}>
			// 		{t('Выйти')}
			// 	</Button> */}
			// </header>
		);
	}

	return (
		<header className={classNames(mainClass, {}, [className])}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<Button variant="outline" className={cls.links} onClick={onShowModal}>
						{t('Войти')}
					</Button>
				}
				off={
					<ButtonDeprecated theme={ThemeButton.OUTLINE} className={cls.links} onClick={onShowModal}>
						{t('Войти')}
					</ButtonDeprecated>
				}
			/>
			{isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}></LoginModal>}
		</header>
	);
});

export default NavBar;

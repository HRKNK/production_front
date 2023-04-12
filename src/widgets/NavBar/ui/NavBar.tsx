/* eslint-disable react/display-name */
import cls from './NavBar.module.scss';

import React, { memo, useCallback, useState } from 'react';
// import { Link } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName/public';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User/public';
import { Text } from 'shared/ui/Text/public';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/public';
// import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
	className?: string;
}

const NavBar = memo(({ className }: NavBarProps) => {
	const [isAuthModal, setisAuthModal] = useState(false);
	const { t } = useTranslation();

	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();

	const onCloseModal = useCallback(() => {
		setisAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setisAuthModal(true);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (authData) {
		return (
			<header className={classNames(cls.navbar, {}, [className])}>
				<Text className={cls.appName} title='APP'></Text>
				<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.articles_create}>
					{t('Создать статью')}
				</AppLink>

				{/* Выпадающий список ссылок */}
				<Dropdown className={cls.dropdown} direction={'bottom left'}
					items={[
						{
							content: t('Выйти'),
							onClick: onLogout,
						},
						{
							content: t('Профиль'),
							href: RoutePath.profile + authData.id,
						},
					]} trigger={<Avatar size={30} src={authData.avatar}/>}
				/>

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

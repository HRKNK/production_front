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
				<Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onLogout}>
					{t('Выйти')}
				</Button>
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

import cls from './NavBar.module.scss';

import React, { useCallback, useState } from 'react';
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

const NavBar = ({ className }: NavBarProps) => {
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
			<div className={classNames(cls.navbar, {}, [className])}>
				<Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onLogout}>
					{t('Выйти')}
				</Button>
			</div>
		);
	}

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onShowModal}>
				{t('Войти')}
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={onCloseModal}></LoginModal>
		</div>
	);
};

export default NavBar;

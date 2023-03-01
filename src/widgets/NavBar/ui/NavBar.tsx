import cls from './NavBar.module.scss';

import React, { useCallback, useState } from 'react';
// import { Link } from 'react-router-dom';

import classNames from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/public';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
// import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
	className?: string;
}

const NavBar = ({ className }: NavBarProps) => {
	const [isAuthModal, setisAuthModal] = useState(false);
	const { t } = useTranslation();

	const onToggleModal = useCallback(() => {
		setisAuthModal(prev => !prev);
	}, []);

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<Button theme={ThemeButton.OUTLINE} className={cls.links} onClick={onToggleModal}>
				{t('Войти')}
			</Button>

			<Modal isOpen={isAuthModal} onClose={onToggleModal}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec semper enim, vitae euismod nunc. Fusce in congue diam.
			</Modal>
		</div>
	);
};

export default NavBar;

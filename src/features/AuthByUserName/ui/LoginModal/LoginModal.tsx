import cls from './LoginModal.module.scss';

import LoginForm from '../LoginForm/LoginForm';

import React from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/public';

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} lazy className={classNames(cls.LoginModal, {}, [className])}>
			<LoginForm></LoginForm>
		</Modal>
	);
};

export default LoginModal;

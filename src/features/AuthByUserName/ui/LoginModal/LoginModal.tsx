import cls from './LoginModal.module.scss';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

import React, { Suspense } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/public';
import { Loader } from 'shared/ui/Loader/public';

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} lazy className={classNames(cls.LoginModal, {}, [className])}>
			<Suspense fallback={<Loader/>}>
				<LoginFormAsync/>
			</Suspense>
		</Modal>
	);
};

export default LoginModal;

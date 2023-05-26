import React, { Suspense } from 'react';

import classNames from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/deprecated/Loader/public';
import { Modal } from 'shared/ui/deprecated/Modal/public';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} lazy className={classNames(cls.LoginModal, {}, [className])}>
			<Suspense fallback={<Loader />}>
				<LoginFormAsync onSuccess={onClose} />
			</Suspense>
		</Modal>
	);
};

export default LoginModal;

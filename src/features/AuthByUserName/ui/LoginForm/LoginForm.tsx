import cls from './LoginForm.module.scss';

import React from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/public';

interface LoginFormProps {
	className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
	const { t } = useTranslation();
	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Input placeholder={'Введите логин'} autoFocus className={cls.input} type='text'></Input>
			<Input placeholder={'Введите пароль'} className={cls.input} type='text'></Input>
			<Button className={cls.loginBtn} >{t('Войти')}</Button>
		</div>
	);
};

export default LoginForm;

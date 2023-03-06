/* eslint-disable react/display-name */
import cls from './LoginForm.module.scss';

import { loginActions } from '../../model/slice/loginSlice';

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';

import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';

import React, { memo, useCallback } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/public';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'shared/ui/Text/public';
import { TextTheme } from 'shared/ui/Text/ui/Text';

interface LoginFormProps {
	className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch<any>(); // проблема типизации в 8ой версии редакса // https://github.com/reduxjs/redux-thunk/issues/333
	const { username, password, error, isLoading } = useSelector(getLoginState);

	const onChangeUserName = useCallback((value: string) => {
		dispatch(loginActions.setUsername(value)); // закидываем action в reducer
	}, [dispatch]);

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value)); // закидываем action в reducer
	}, [dispatch]);

	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ password, username }));
	}, [dispatch, password, username]);

	return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Text title={t('Форма авторизации')}/>
			{error && <Text text={error} theme={TextTheme.ERROR}/>}
			<Input onChange={onChangeUserName} value={username} placeholder={'Введите логин'} autoFocus className={cls.input} type='text'></Input>
			<Input onChange={onChangePassword} value={password} placeholder={'Введите пароль'} className={cls.input} type='text'></Input>
			<Button disabled={isLoading} onClick={onLoginClick} theme={ThemeButton.OUTLINE} className={cls.loginBtn} >{t('Войти')}</Button>
		</div>
	);
});

export default LoginForm;

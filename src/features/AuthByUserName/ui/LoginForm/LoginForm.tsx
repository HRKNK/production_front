/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable no-tabs */

/* eslint-disable react/display-name */
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { type ReduxStoreWithManager } from 'app/providers/storeProvider/public';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/public';
import { Input } from 'shared/ui/Input/public';
import { Text } from 'shared/ui/Text/public';
import { TextTheme } from 'shared/ui/Text/public';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	// const dispatch = useDispatch<any>(); // проблема типизации в 8ой версии редакса // https://github.com/reduxjs/redux-thunk/issues/333
	// const store = useStore() as ReduxStoreWithManager;
	// const { username, password, error, isLoading } = useSelector(getLoginState);

	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const error = useSelector(getLoginError);
	const isLoading = useSelector(getLoginIsLoading);

	const initialReducers: ReducersList = {
		loginForm: loginReducer,
	};
	// useEffect(() => {
	// 	store.reducerManager.add('loginForm', loginReducer);

	//	return () => {
	//		store.reducerManager.remove('loginForm');
	// 	};
	// 	// eslint-disable-next-line
	// }, []);

	const onChangeUserName = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value)); // закидываем action в reducer
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value)); // закидываем action в reducer
		},
		[dispatch]
	);

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ password, username }));
		if (result.meta.requestStatus === 'fulfilled') {
			onSuccess();
		}
	}, [dispatch, onSuccess, password, username]);

	return (
		<DynamicModuleLoader removeAfterUnmount={true} reducers={initialReducers}>
			<div className={classNames(cls.LoginForm, {}, [className])}>
				<Text title={t('Форма авторизации')} />
				{error && <Text text={error} theme={TextTheme.ERROR} />}
				<Input onChange={onChangeUserName} value={username} placeholder={'Введите логин'} autoFocus className={cls.input} type="text"></Input>
				<Input onChange={onChangePassword} value={password} placeholder={'Введите пароль'} className={cls.input} type="text"></Input>
				<Button disabled={isLoading} onClick={onLoginClick} theme={ThemeButton.OUTLINE} className={cls.loginBtn}>
					{t('Войти')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;

/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable no-tabs */

/* eslint-disable react/display-name */
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { type ReduxStoreWithManager } from 'app/providers/storeProvider/public';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/public';
import { Text as TextDeprecated, TextTheme } from 'shared/ui/deprecated/Text/public';
import { Button } from 'shared/ui/redesigned/Button/public';
import { Input } from 'shared/ui/redesigned/Input/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
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
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<div className={classNames(cls.LoginForm, {}, [className])}>
						<Text title={t('Форма авторизации')} />
						{error && <Text text={error} variant="error" />}
						<Input onChange={onChangeUserName} value={username} placeholder={'Введите логин'} autoFocus className={cls.input} type="text"></Input>
						<Input onChange={onChangePassword} value={password} placeholder={'Введите пароль'} className={cls.input} type="text"></Input>
						<Button disabled={isLoading} onClick={onLoginClick} variant="outline" className={cls.loginBtn}>
							{t('Войти')}
						</Button>
					</div>
				}
				off={
					<div className={classNames(cls.LoginForm, {}, [className])}>
						<TextDeprecated title={t('Форма авторизации')} />
						{error && <TextDeprecated text={error} theme={TextTheme.ERROR} />}
						<InputDeprecated
							onChange={onChangeUserName}
							value={username}
							placeholder={'Введите логин'}
							autoFocus
							className={cls.input}
							type="text"
						></InputDeprecated>
						<InputDeprecated
							onChange={onChangePassword}
							value={password}
							placeholder={'Введите пароль'}
							className={cls.input}
							type="text"
						></InputDeprecated>
						<ButtonDeprecated disabled={isLoading} onClick={onLoginClick} theme={ThemeButton.OUTLINE} className={cls.loginBtn}>
							{t('Войти')}
						</ButtonDeprecated>
					</div>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default LoginForm;

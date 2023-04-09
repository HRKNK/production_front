import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
	fetchProfileData, getProfileError, getProfileForm,
	getProfileIsLoading, getProfileReadonly, getValidateProfileErrors,
	profileActions, ProfileCard, profileReducer, ValidateProfileError,
} from 'entities/Profile/public';
import classNames from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useSelector } from 'react-redux';
import { type Currency } from 'entities/Currency/public';
import { type Country } from 'entities/Country/public';
import { Text, TextTheme } from 'shared/ui/Text/public';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack/public';

const reducers: ReducersList = {
	profile: profileReducer,
};

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string, }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса

	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readOnly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getValidateProfileErrors);

	const validateErrorsTranslate = {
		[ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
		[ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
		[ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректная валюта'),
		[ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
		[ValidateProfileError.INCORRECT_PASSWORD]: t('Некорректный пароль'),
		[ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректные данные о пользователе'),
		[ValidateProfileError.NO_DATA]: t('Данные не указаны'),
	};

	useInitialEffect(() => {
		if (id) {
			void dispatch(fetchProfileData(id));
		}
	});

	const onChangeFirstname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ first: value || '' }));
	}, [dispatch]);

	const onChangeLastname = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ lastname: value || '' }));
	}, [dispatch]);

	const onChangeCity = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ city: value || '' }));
	}, [dispatch]);

	const onChangeAge = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ age: Number(value.match(/^\d{0,2}$/)) }));
	}, [dispatch]);

	const onChangeAvatar = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ avatar: value || '' }));
	}, [dispatch]);

	const onChangeUserName = useCallback((value?: string) => {
		dispatch(profileActions.updateProfileData({ username: value || '' }));
	}, [dispatch]);

	const onChangeCurrency = useCallback((currency: Currency) => {
		dispatch(profileActions.updateProfileData({ currency }));
	}, [dispatch]);

	const onChangeCountry = useCallback((country: Country) => {
		dispatch(profileActions.updateProfileData({ country }));
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={classNames('', {}, [className])}>
				<VStack max gap={'16'}>
					<ProfilePageHeader></ProfilePageHeader>
					{ validateErrors?.length && validateErrors.map((error, id) => {
						return <Text key={id} theme={TextTheme.ERROR} text={validateErrorsTranslate[error]}></Text>;
					}) }
					<ProfileCard
						onChangeUserName={onChangeUserName}
						onChangeAvatar={onChangeAvatar}
						onChangeCity={onChangeCity}
						onChangeAge={onChangeAge}
						onChangeFirstname={onChangeFirstname}
						onChangeLastname={onChangeLastname}
						onChangeCurrency={onChangeCurrency}
						onChangeCountry={onChangeCountry}
						data={formData}
						isLoading={isLoading}
						error={error}
						readonly={readOnly}
					/>
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default ProfilePage;

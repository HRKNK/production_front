import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { type Country } from 'entities/Country/public';
import { type Currency } from 'entities/Currency/public';
import { ProfileCard } from 'entities/Profile/public';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack/public';
import { Text, TextTheme } from 'shared/ui/Text/public';

import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getValidateProfileErrors } from '../../model/selectors/getValidateProfileErrors/getValidateProfileErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	profile: profileReducer,
};

// eslint-disable-next-line react/display-name
export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className, id } = props;
	const { t } = useTranslation('profile');

	const dispatch = useAppDispatch();
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
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

	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfileData({ first: value || '' }));
		},
		[dispatch]
	);

	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfileData({ lastname: value || '' }));
		},
		[dispatch]
	);

	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfileData({ city: value || '' }));
		},
		[dispatch]
	);

	const onChangeAge = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfileData({ age: Number(value.match(/^\d{0,2}$/)) }));
		},
		[dispatch]
	);

	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfileData({ avatar: value || '' }));
		},
		[dispatch]
	);

	const onChangeUserName = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfileData({ username: value || '' }));
		},
		[dispatch]
	);

	const onChangeCurrency = useCallback(
		(currency: Currency) => {
			dispatch(profileActions.updateProfileData({ currency }));
		},
		[dispatch]
	);

	const onChangeCountry = useCallback(
		(country: Country) => {
			dispatch(profileActions.updateProfileData({ country }));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<VStack gap="8" max className={classNames('', {}, [className])}>
				<EditableProfileCardHeader />
				{validateErrors?.length &&
					validateErrors.map((error, id) => {
						return <Text data-testid={'EditableProfileCard.Error'} key={id} theme={TextTheme.ERROR} text={validateErrorsTranslate[error]}></Text>;
					})}
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
					readonly={readonly}
				/>
			</VStack>
		</DynamicModuleLoader>
	);
});

import { useTranslation } from 'react-i18next';

import { CountrySelect } from 'entities/Country/public';
import { CurrencySelect } from 'entities/Currency/public';
import classNames, { type Mods } from 'shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/public';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/public';
import { Loader as LoaderDeprecated } from 'shared/ui/deprecated/Loader/public';
import { TextAlign, Text as TextDeprecated, TextTheme } from 'shared/ui/deprecated/Text/public';
import { HStack, VStack } from 'shared/ui/redesigned/Stack/public';

import { type ProfileCardProps } from '../ProfileCard/ProfileCard';
import cls from './ProfileCardDeprecated.module.scss';

// Версия устаревшего компонента (уходит внутрь ToggleFeatures/off)
export const ProfileCardDeprecated = (props: ProfileCardProps) => {
	const { t } = useTranslation('profile');
	const {
		className,
		data,
		isLoading,
		error,
		onChangeFirstname,
		onChangeLastname,
		onChangeCity,
		onChangeAge,
		onChangeUserName,
		onChangeAvatar,
		onChangeCountry,
		onChangeCurrency,
		readonly,
	} = props;

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	if (isLoading) {
		return (
			<HStack gap={'8'} justify="center" max className={classNames(cls.ProfileCard, { [cls.isLoading]: true }, [className])}>
				{/* <div className={classNames(cls.profileCard__loader, {}, [className])}/> */}
				<LoaderDeprecated></LoaderDeprecated>
			</HStack>
		);
	}

	if (error) {
		return (
			<HStack gap={'8'} justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<TextDeprecated theme={TextTheme.ERROR} title={t('Произошла ошибка')} text={t('Попробуйте обновить страницу')} align={TextAlign.CENTER} />
			</HStack>
		);
	}

	return (
		<VStack gap={'8'} max className={classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar && (
				<HStack max gap="8" justify="center">
					<AvatarDeprecated src={data?.avatar} />
				</HStack>
			)}
			<div className={cls.data}>
				<InputDeprecated
					value={data?.first}
					placeholder={t('Ваше имя')}
					className={cls.input}
					onChange={onChangeFirstname}
					readonly={readonly}
					data-testid="ProfileCard.firstname"
				/>
				<InputDeprecated
					value={data?.lastname}
					placeholder={t('Ваша фамилия')}
					className={cls.input}
					onChange={onChangeLastname}
					readonly={readonly}
					data-testid="ProfileCard.lastname"
				/>
				<InputDeprecated value={data?.age} placeholder={t('Возраст')} className={cls.input} onChange={onChangeAge} readonly={readonly} />
				<InputDeprecated value={data?.city} placeholder={t('Город')} className={cls.input} onChange={onChangeCity} readonly={readonly} />
				<InputDeprecated
					value={data?.avatar}
					placeholder={t('Ссылка на аватар')}
					className={cls.input}
					onChange={onChangeAvatar}
					readonly={readonly}
				/>
				<InputDeprecated
					value={data?.username}
					placeholder={t('Имя пользователя')}
					className={cls.input}
					onChange={onChangeUserName}
					readonly={readonly}
				/>
				<HStack gap="16">
					<CurrencySelect className={cls.input} onChange={onChangeCurrency} readonly={readonly} value={data?.currency} />
					<CountrySelect className={cls.input} onChange={onChangeCountry} readonly={readonly} value={data?.country} />
				</HStack>
			</div>
		</VStack>
	);
};

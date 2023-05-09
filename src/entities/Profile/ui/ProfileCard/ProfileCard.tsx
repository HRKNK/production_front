import { useTranslation } from 'react-i18next';

import { type Country, CountrySelect } from 'entities/Country/public';
import { type Currency, CurrencySelect } from 'entities/Currency/public';
import classNames, { type Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/public';
import { Button, ThemeButton } from 'shared/ui/Button/public';
import { Input } from 'shared/ui/Input/public';
import { Loader } from 'shared/ui/Loader/public';
import { HStack, VStack } from 'shared/ui/Stack/public';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/public';

import { type Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeUserName?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCountry?: (country: Country) => void;
	onChangeCurrency?: (currency: Currency) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
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

	if (isLoading) {
		return (
			<HStack gap={'8'} justify="center" max className={classNames(cls.ProfileCard, { [cls.isLoading]: true }, [className])}>
				{/* <div className={classNames(cls.profileCard__loader, {}, [className])}/> */}
				<Loader></Loader>
			</HStack>
		);
	}

	if (error) {
		return (
			<HStack gap={'8'} justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text theme={TextTheme.ERROR} title={t('Произошла ошибка')} text={t('Попробуйте обновить страницу')} align={TextAlign.CENTER} />
			</HStack>
		);
	}

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<VStack gap={'8'} max className={classNames(cls.ProfileCard, mods, [className])}>
			{/* <div className={cls.header}> // Перенесено в ProfilePageHeader.tsx
				<Text title={t('Профиль')} />
				<Button
					className={cls.editBtn}
					theme={ThemeButton.OUTLINE}
				>
					{t('Редактировать')}
				</Button>
			</div> */}
			{data?.avatar && (
				<HStack max gap="8" justify="center">
					<Avatar src={data?.avatar} />
				</HStack>
			)}
			<div className={cls.data}>
				<Input
					value={data?.first}
					placeholder={t('Ваше имя')}
					className={cls.input}
					onChange={onChangeFirstname}
					readonly={readonly}
					data-testid="ProfileCard.firstname"
				/>
				<Input
					value={data?.lastname}
					placeholder={t('Ваша фамилия')}
					className={cls.input}
					onChange={onChangeLastname}
					readonly={readonly}
					data-testid="ProfileCard.lastname"
				/>
				<Input value={data?.age} placeholder={t('Возраст')} className={cls.input} onChange={onChangeAge} readonly={readonly} />
				<Input value={data?.city} placeholder={t('Город')} className={cls.input} onChange={onChangeCity} readonly={readonly} />
				<Input value={data?.avatar} placeholder={t('Ссылка на аватар')} className={cls.input} onChange={onChangeAvatar} readonly={readonly} />
				<Input value={data?.username} placeholder={t('Имя пользователя')} className={cls.input} onChange={onChangeUserName} readonly={readonly} />
				<HStack gap="16">
					<CurrencySelect className={cls.input} onChange={onChangeCurrency} readonly={readonly} value={data?.currency} />
					<CountrySelect className={cls.input} onChange={onChangeCountry} readonly={readonly} value={data?.country} />
				</HStack>
			</div>
		</VStack>
	);
};

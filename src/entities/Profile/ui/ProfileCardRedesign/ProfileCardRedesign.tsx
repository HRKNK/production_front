import { useTranslation } from 'react-i18next';

import { CountrySelect } from 'entities/Country/public';
import { CurrencySelect } from 'entities/Currency/public';
import classNames from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/redesigned/Avatar/public';
import { Card } from 'shared/ui/redesigned/Card/public';
import { Input } from 'shared/ui/redesigned/Input/public';
import { Skeleton } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { type ProfileCardProps } from '../ProfileCard/ProfileCard';
import cls from './ProfileCardRedesign.module.scss';

export const ProfileCardRedesign = (props: ProfileCardProps) => {
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
			<Card padding="24" max>
				<VStack gap="32">
					<HStack max justify="center">
						<Skeleton border={'100%'} width={128} height={128}></Skeleton>
					</HStack>
					<HStack gap="32" max>
						<VStack gap={'16'} max>
							<Skeleton width={'100%'} height={38}></Skeleton>
							<Skeleton width={'100%'} height={38}></Skeleton>
							<Skeleton width={'100%'} height={38}></Skeleton>
							<Skeleton width={'100%'} height={38}></Skeleton>
						</VStack>
						<VStack gap={'16'} max>
							<Skeleton width={'100%'} height={38}></Skeleton>
							<Skeleton width={'100%'} height={38}></Skeleton>
							<Skeleton width={'100%'} height={38}></Skeleton>
							<Skeleton width={'100%'} height={38}></Skeleton>
						</VStack>
					</HStack>
				</VStack>
			</Card>
		);
	}

	if (error) {
		return (
			<HStack gap={'8'} justify="center" max className={classNames(cls.ProfileCardRedesigned, {}, [cls.error])}>
				<Text variant="error" title={t('Произошла ошибка')} text={t('Попробуйте обновить страницу')} align="center" />
			</HStack>
		);
	}

	return (
		<Card padding="24" max className={classNames(cls.ProfileCardRedesigned, {}, [className])}>
			<VStack gap="32">
				{data?.avatar && (
					<HStack max gap="8" justify="center">
						<Avatar size={128} src={data?.avatar} />
					</HStack>
				)}
				<HStack max gap="24">
					<VStack max gap="16">
						<Input value={data?.first} label={t('Имя')} onChange={onChangeFirstname} readonly={readonly} data-testid="ProfileCard.firstname" />
						<Input value={data?.lastname} label={t('Фамилия')} onChange={onChangeLastname} readonly={readonly} data-testid="ProfileCard.lastname" />
						<Input value={data?.age} label={t('Возраст')} onChange={onChangeAge} readonly={readonly} />
						<Input value={data?.city} label={t('Город')} onChange={onChangeCity} readonly={readonly} />
					</VStack>
					<VStack max gap="16">
						<Input value={data?.avatar} label={t('Ссылка на аватар')} onChange={onChangeAvatar} readonly={readonly} />
						<Input value={data?.username} label={t('Имя пользователя')} onChange={onChangeUserName} readonly={readonly} />
						<CurrencySelect onChange={onChangeCurrency} readonly={readonly} value={data?.currency} />
						<CountrySelect onChange={onChangeCountry} readonly={readonly} value={data?.country} />
					</VStack>
				</HStack>
			</VStack>
		</Card>
	);
};

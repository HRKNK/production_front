import cls from './ProfileCard.module.scss';

import { type Profile } from '../../model/types/profile';

import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/public';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/public';
import { Loader } from 'shared/ui/Loader/public';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstname: (value?: string) => void;
	onChangeLastname: (value?: string) => void;
}

export const ProfileCard = ({ className, data, isLoading, error, onChangeFirstname, onChangeLastname, readonly }: ProfileCardProps) => {
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<div className={classNames(cls.ProfileCard, { [cls.isLoading]: true }, [className])}>
				{/* <div className={classNames(cls.profileCard__loader, {}, [className])}/> */}
				<Loader></Loader>
			</div>
		);
	}

	if (error) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					title={t('Произошла ошибка')}
					text={t('Попробуйте обновить страницу')}
					align={TextAlign.CENTER}
				/>
			</div>
		);
	}

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			{/* <div className={cls.header}> // Перенесено в ProfilePageHeader.tsx
				<Text title={t('Профиль')} />
				<Button
					className={cls.editBtn}
					theme={ThemeButton.OUTLINE}
				>
					{t('Редактировать')}
				</Button>
			</div> */}
			<div className={cls.data}>
				<Input
					value={data?.first}
					placeholder={t('Ваше имя')}
					className={cls.input}
					onChange={onChangeFirstname}
					readonly={readonly}
				/>
				<Input
					value={data?.lastname}
					placeholder={t('Ваша фамилия')}
					className={cls.input}
					onChange={onChangeLastname}
					readonly={readonly}
				/>
				<Input
					value={data?.age}
					placeholder={t('Возраст')}
					className={cls.input}
					onChange={onChangeLastname}
					readonly={readonly}
				/>
				<Input
					value={data?.city}
					placeholder={t('Город')}
					className={cls.input}
					onChange={onChangeLastname}
					readonly={readonly}
				/>
			</div>
		</div>
	);
};

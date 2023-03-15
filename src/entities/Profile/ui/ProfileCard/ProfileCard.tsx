import cls from './ProfileCard.module.scss';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/public';
import { Text } from 'shared/ui/Text/public';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
	const { t } = useTranslation('profile');
	const data = useSelector(getProfileData);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);

	return (
		<div className={classNames(cls.ProfileCard, {}, [className])}>
			<div className={cls.header}>
				<Text title={t('Профиль')} />
				<Button
					className={cls.editBtn}
					theme={ThemeButton.OUTLINE}
				>
					{t('Редактировать')}
				</Button>
			</div>
			<div className={cls.data}>
				<Input
					value={data?.first}
					placeholder={t('Ваше имя')}
					className={cls.input}
				/>
				<Input
					value={data?.lastname}
					placeholder={t('Ваша фамилия')}
					className={cls.input}
				/>
			</div>
		</div>
	);
};

import cls from './ProfilePageHeader.module.scss';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classNames from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/public';
import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile/public';
import { getUserAuthData } from 'entities/User/public';

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
	const {
		className,
	} = props;

	const { t } = useTranslation('profile');

	const readonly = useSelector(getProfileReadonly);
	const dispatch = useAppDispatch();

	const authData = useSelector(getUserAuthData);
	const profileData = useSelector(getProfileData);
	const canEdit = authData?.id === profileData?.id;

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadOnly(false));
	}, [dispatch]);

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onSave = useCallback(() => {
		void dispatch(updateProfileData());
	}, [dispatch]);

	return (
		<div className={classNames(cls.ProfilePageHeader, {}, [className])}>
			<Text title={t('Профиль')} />
			{canEdit && (
				<div className={cls.btnWrapper}>
					{readonly
						? (
							<Button
								className={cls.editBtn}
								theme={ThemeButton.OUTLINE}
								onClick={onEdit}
							>
								{t('Редактировать')}
							</Button>
						)
						: (
							<>
								<Button
									className={cls.editBtn}
									theme={ThemeButton.OUTLINE_RED}
									onClick={onCancelEdit}
								>
									{t('Отменить')}
								</Button>
								<Button
									className={cls.saveBtn}
									theme={ThemeButton.OUTLINE}
									onClick={onSave}
								>
									{t('Сохранить')}
								</Button>
							</>
						)}
				</div>
			)}
		</div>
	);
};

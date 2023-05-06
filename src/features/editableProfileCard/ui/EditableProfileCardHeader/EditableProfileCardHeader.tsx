import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

import { profileActions } from '../../model/slice/profileSlice';

import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';

import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classNames from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/public';
import { Text } from 'shared/ui/Text/public';
import { getUserAuthData } from 'entities/User/public';
import { HStack } from 'shared/ui/Stack/public';

interface EditableProfileCardHeaderProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
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
		<HStack max justify={'between'} className={classNames('', {}, [className])}>
			<Text title={t('Профиль')} />
			{canEdit && (
				<>
					{readonly
						? (
							<Button
								// className={cls.editBtn}
								theme={ThemeButton.OUTLINE}
								onClick={onEdit}
								data-testid={'EditableProfileCardHeader.EditButton'}
							>
								{t('Редактировать')}
							</Button>
						)
						: (
							<HStack gap={'8'}>
								<Button
									// className={cls.editBtn}
									theme={ThemeButton.OUTLINE_RED}
									onClick={onCancelEdit}
									data-testid={'EditableProfileCardHeader.CancelButton'}
								>
									{t('Отменить')}
								</Button>
								<Button
									// className={cls.saveBtn}
									theme={ThemeButton.OUTLINE}
									onClick={onSave}
									data-testid={'EditableProfileCardHeader.SaveButton'}
								>
									{t('Сохранить')}
								</Button>
							</HStack>
						)}
				</>
			)}
		</HStack>
	);
});

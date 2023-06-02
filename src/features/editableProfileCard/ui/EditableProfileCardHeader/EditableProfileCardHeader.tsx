import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from 'entities/User/public';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/public';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { Card } from 'shared/ui/redesigned/Card/public';
import { HStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
	const { className } = props;

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
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card padding="24" max>
					<HStack max justify={'between'} className={classNames('', {}, [className])}>
						<Text title={t('Профиль')} />
						{canEdit && (
							<>
								{readonly ? (
									<Button
										// className={cls.editBtn}
										variant="outline"
										onClick={onEdit}
										data-testid={'EditableProfileCardHeader.EditButton'}
									>
										{t('Редактировать')}
									</Button>
								) : (
									<HStack gap={'8'}>
										<Button
											// className={cls.editBtn}
											variant="outline"
											color="error"
											onClick={onCancelEdit}
											data-testid={'EditableProfileCardHeader.CancelButton'}
										>
											{t('Отменить')}
										</Button>
										<Button
											// className={cls.saveBtn}
											variant="outline"
											color="success"
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
				</Card>
			}
			off={
				<HStack max justify={'between'} className={classNames('', {}, [className])}>
					<TextDeprecated title={t('Профиль')} />
					{canEdit && (
						<>
							{readonly ? (
								<ButtonDeprecated
									// className={cls.editBtn}
									theme={ThemeButton.OUTLINE}
									onClick={onEdit}
									data-testid={'EditableProfileCardHeader.EditButton'}
								>
									{t('Редактировать')}
								</ButtonDeprecated>
							) : (
								<HStack gap={'8'}>
									<ButtonDeprecated
										// className={cls.editBtn}
										theme={ThemeButton.OUTLINE_RED}
										onClick={onCancelEdit}
										data-testid={'EditableProfileCardHeader.CancelButton'}
									>
										{t('Отменить')}
									</ButtonDeprecated>
									<ButtonDeprecated
										// className={cls.saveBtn}
										theme={ThemeButton.OUTLINE}
										onClick={onSave}
										data-testid={'EditableProfileCardHeader.SaveButton'}
									>
										{t('Сохранить')}
									</ButtonDeprecated>
								</HStack>
							)}
						</>
					)}
				</HStack>
			}
		/>
	);
});

import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Input as InputDeprecated } from 'shared/ui/deprecated/Input/public';
import { Button } from 'shared/ui/redesigned/Button/public';
import { Card } from 'shared/ui/redesigned/Card/public';
import { Input } from 'shared/ui/redesigned/Input/public';
import { HStack } from 'shared/ui/redesigned/Stack/public';

import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
	// передается в DynamicModuleLoader
	addCommentForm: addCommentFormReducer,
};

// eslint-disable-next-line react/display-name
const AddCommentForm = memo((props: AddCommentFormProps) => {
	const { className, onSendComment } = props;
	const { t } = useTranslation();
	const text = useSelector(getAddCommentFormText);
	const error = useSelector(getAddCommentFormError);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(value: string) => {
			dispatch(addCommentFormActions.setText(value)); // get slice data
		},
		[dispatch]
	);

	// Отправка комментария / Очистка инпута
	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onCommentTextChange, onSendComment, text]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<Card max padding="24" border="border_round">
						<HStack gap="16" data-testid="AddCommentForm" justify="between" max className={classNames(cls.AddCommentFormRedesigned, {}, [className])}>
							<Input
								data-testid="AddCommentForm.Input"
								className={cls.input}
								placeholder={t('Введите текст комментария')}
								value={text}
								onChange={onCommentTextChange}
							/>
							<Button data-testid="AddCommentForm.Button" variant="outline" onClick={onSendHandler}>
								{t('Отправить')}
							</Button>
						</HStack>
					</Card>
				}
				off={
					<HStack data-testid="AddCommentForm" justify="between" max>
						<div className={classNames(cls.AddCommentForm, {}, [className])}>
							<InputDeprecated
								data-testid="AddCommentForm.Input"
								className={cls.input}
								placeholder={t('Введите текст комментария')}
								value={text}
								onChange={onCommentTextChange}
							/>
							<ButtonDeprecated data-testid="AddCommentForm.Button" theme={ThemeButton.OUTLINE} onClick={onSendHandler}>
								{t('Отправить')}
							</ButtonDeprecated>
						</div>
					</HStack>
				}
			/>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;

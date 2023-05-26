import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Input } from 'shared/ui/deprecated/Input/public';
import { HStack, VStack } from 'shared/ui/deprecated/Stack/public';

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
			<HStack data-testid="AddCommentForm" justify="between" max>
				<div className={classNames(cls.AddCommentForm, {}, [className])}>
					<Input
						data-testid="AddCommentForm.Input"
						className={cls.input}
						placeholder={t('Введите текст комментария')}
						value={text}
						onChange={onCommentTextChange}
					/>
					<Button data-testid="AddCommentForm.Button" theme={ThemeButton.OUTLINE} onClick={onSendHandler}>
						{t('Отправить')}
					</Button>
				</div>
			</HStack>
		</DynamicModuleLoader>
	);
});

export default AddCommentForm;

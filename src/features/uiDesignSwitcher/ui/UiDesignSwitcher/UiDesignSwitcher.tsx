/* eslint-disable @typescript-eslint/no-misused-promises */
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from 'entities/User/public';
import { getFeatureFlag, updateFeatureFlag } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ListBox } from 'shared/ui/redesigned/ListBox/public';
import { Skeleton } from 'shared/ui/redesigned/Skeleton/public';
import { HStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

interface UiDesignSwitcherProps {
	className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const isAppRedesigned = getFeatureFlag('isAppRedesigned'); // текущий флаг дизайна
	const dispatch = useAppDispatch();
	const authData = useSelector(getUserAuthData);
	const [isLoading, setIsLoading] = useState(false);

	// Пункты настроек
	const items = [
		{
			content: t('Новый'),
			value: 'new',
		},
		{
			content: t('Старый'),
			value: 'old',
		},
	];

	// Запрос на смену дизайна
	const onChange = async (value: string) => {
		if (authData) {
			setIsLoading(true);
			await dispatch(
				updateFeatureFlag({
					// newFeatures = апи получит features
					userId: authData.id,
					newFeatures: {
						isAppRedesigned: value === 'new',
					},
				})
			).unwrap(); // Разворачивает вызов мутации, чтобы предоставить необработанный ответ/ошибку.
			setIsLoading(false);
		}
	};

	return (
		<HStack gap="8">
			{/* Заголвок */}
			<Text text={t('Вариант интерфейса')} />
			{/* Лоадер/Выпадающее меню */}
			{isLoading ? (
				<Skeleton width={100} height={40} />
			) : (
				<ListBox onChange={onChange} items={items} value={isAppRedesigned ? 'new' : 'old'} className={className} />
			)}
		</HStack>
	);
});

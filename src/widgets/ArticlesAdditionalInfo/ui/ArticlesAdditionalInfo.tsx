import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { type User } from 'entities/User/public';
import { Avatar } from 'shared/ui/redesigned/Avatar/public';
import { Button } from 'shared/ui/redesigned/Button/Button';
import { HStack, VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

interface ArticlesAdditionalInfoProps {
	className?: string;
	onEdit?: () => void;
	author: User;
	createdAt: string;
	views: number;
}

export const ArticlesAdditionalInfo = memo((props: ArticlesAdditionalInfoProps) => {
	const { className, author, createdAt, views, onEdit } = props;
	const { t } = useTranslation();

	return (
		<VStack gap="32" className={className}>
			<HStack gap="8">
				<Avatar src={author.avatar} size={32} />
				<Text text={author.username} bold />
				<Text text={createdAt} />
			</HStack>
			<Button onClick={onEdit}>{t('Редактировать')}</Button>
			{/* https://www.i18next.com/translation-function/plurals */}
			<Text text={t('{{count}} просмотров', { count: views })} />
		</VStack>
	);
});

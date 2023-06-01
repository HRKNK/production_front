import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from 'entities/Article/public';
import { Card } from 'shared/ui/redesigned/Card/public';

interface DetailsContainerProps {
	className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
	const { className } = props;
	const { id } = useParams<{ id: string }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса

	return (
		<Card max className={className} padding="24">
			{/* Список статей */}
			<ArticleDetails id={id}></ArticleDetails>
		</Card>
	);
});

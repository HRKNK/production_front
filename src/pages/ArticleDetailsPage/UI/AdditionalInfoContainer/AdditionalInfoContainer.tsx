import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getArticleDetailsData } from 'entities/Article/public';
import { Card } from 'shared/ui/redesigned/Card/public';
import { ArticlesAdditionalInfo } from 'widgets/ArticlesAdditionalInfo/public';

import cls from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
	const article = useSelector(getArticleDetailsData);

	const navigate = useNavigate();

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.articles_details}${article?.id}/edit`); // маршрут на страницу изменения
	}, [article?.id, navigate]);

	if (!article) {
		return null;
	}

	return (
		<Card padding="24" border="border_round" className={cls.card}>
			<ArticlesAdditionalInfo onEdit={onEditArticle} author={article?.user} createdAt={article?.createdAt} views={article?.views} />
		</Card>
	);
});

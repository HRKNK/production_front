import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import { getArticleDetailsData } from 'entities/Article/public';
import classNames from 'shared/lib/classNames/classNames';
// import { getUserAuthData } from 'entities/User/public';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/public';

import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const canEdit = useSelector(getCanEditArticle); // проверка на article.user.id === user.id
	const article = useSelector(getArticleDetailsData);

	const onBackToList = useCallback(() => {
		// возврат обратно к списку
		navigate(RoutePath.articles);
	}, [navigate]);

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.articles_details}${article?.id}/edit`); // маршрут на страницу изменения
	}, [article?.id, navigate]);

	return (
		<div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
			<Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
				{t('Назад к списку')}
			</Button>
			{canEdit && (
				<Button className={cls.editBtn} theme={ThemeButton.OUTLINE} onClick={onEditArticle}>
					{t('Редактировать')}
				</Button>
			)}
		</div>
	);
});

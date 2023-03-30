import cls from './ArticleList.module.scss';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import { type Article, ArticleView } from '../../model/types/article';

import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView; // вид отображения списка
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3) // кол-во скелетонов SMALL/BIG
	.fill(0) // заполнение массива пустым содержимым
	.map((item, index) => ( // отрисовываем скелетоны
		<ArticleListItemSkeleton className={cls.card} key={index} view={view} />
	));

// eslint-disable-next-line react/display-name
export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, view = ArticleView.SMALL, isLoading } = props;
	const { t } = useTranslation();

	// if (isLoading) {
	// 	return (
	// 		<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
	// 			{getSkeletons(view)}
	// 		</div>
	// 	);
	// }

	const renderArticle = (article: Article) => (
		<ArticleListItem
			article={article}
			view={view}
			className={cls.card}
			key={article.id}
		/>
	);

	return (
		<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
			{articles.length > 0
				? articles.map(renderArticle)
				: null}
			{isLoading && getSkeletons(view)}
		</div>
	);
});

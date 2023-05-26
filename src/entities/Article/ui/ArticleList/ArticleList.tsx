import { type HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/deprecated/Text/public';

import { ArticleView } from '../../model/consts/consts';
import { type Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView; // вид отображения списка
	target?: HTMLAttributeAnchorTarget; // https://www.jsdocs.io/package/@types/react // HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.SMALL ? 9 : 3) // кол-во скелетонов SMALL/BIG
		.fill(0) // заполнение массива пустым содержимым
		.map(
			(
				item,
				index // отрисовываем скелетоны
			) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
		);

// eslint-disable-next-line react/display-name
export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, view = ArticleView.SMALL, isLoading, target } = props;
	const { t } = useTranslation();

	// if (isLoading) {
	// 	return (
	// 		<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
	// 			{getSkeletons(view)}
	// 		</div>
	// 	);
	// }

	const renderArticle = (article: Article) => <ArticleListItem target={target} article={article} view={view} className={cls.card} key={article.id} />;

	if (!isLoading && !articles.length) {
		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				<Text size={TextSize.L} title={t('Статьи не найдены')}></Text>
			</div>
		);
	}

	return (
		<div data-testid="ArticleList" className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
			{articles.length > 0 ? articles.map(renderArticle) : null}
			{isLoading && getSkeletons(view)}
		</div>
	);
});

import cls from './ArticleListItem.module.scss';

import { type Article, type ArticleTextBlock } from '../../model/types/article';

import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import { ArticleBlockType, ArticleView } from '../../model/consts/consts';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { type HTMLAttributeAnchorTarget, HTMLAttributes, memo, useCallback } from 'react';
import { Text } from 'shared/ui/Text/public';
import { Icon } from 'shared/ui/Icon/public';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Avatar } from 'shared/ui/Avatar/public';
import { Button, ThemeButton } from 'shared/ui/Button/public';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { Card } from 'shared/ui/Card/public';
import { AppLink } from 'shared/ui/AppLink/public';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView; // вид отображения списка
	target?: HTMLAttributeAnchorTarget; // https://www.jsdocs.io/package/@types/react // HTMLAttributeAnchorTarget
}

// eslint-disable-next-line react/display-name
export const ArticleListItem = memo((props: ArticleListItemProps) => {
	const { className, article, view, target } = props;
	const { t } = useTranslation();

	// const navigate = useNavigate();
	// const onOpenArticle = useCallback(() => {
	// 	navigate(RoutePath.articles_details + article.id); // url путь до статьи
	// }, [article.id, navigate]);

	const types = <Text text={article.type.join(', ')} className={cls.types} />; // ТИП статьи
	const views = ( // Компонент просмотров
		<>
			<Text text={String(article.views)} className={cls.views} />
			<Icon Svg={EyeIcon} />
		</>
	);

	// BIG view
	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
		return (
			<div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.username} />
						<Text text={article.createdAt} className={cls.date} />
					</div>
					<Text title={article.title} className={cls.title} />
					{types}
					<img src={article.img} className={cls.img} alt={article.title} />
					{textBlock && (
						<ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
					)}
					<div className={cls.footer}>
						{/* для таргет бланка */}
						<AppLink target={target} to={RoutePath.articles_details + article.id}>
							<Button theme={ThemeButton.OUTLINE}> {/* onClick={onOpenArticle} */}
								{t('Читать далее...')}
							</Button>
						</AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	// SMALL view
	return (
		<AppLink target={target} to={RoutePath.articles_details + article.id} className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
			<Card className={cls.card}> {/* onClick={onOpenArticle} */}
				{/* Карточка с аватаром / датой создания */}
				<div className={cls.imageWrapper}>
					<img alt={article.title} src={article.img} className={cls.img} />
					<Text text={article.createdAt} className={cls.date} />
				</div>
				{/* Блок с просмотрами/типом статьи */}
				<div className={cls.infoWrapper}>
					{types}
					{views}
				</div>
				{/* Заголовок */}
				<Text text={article.title} className={cls.title} />
			</Card>
		</AppLink>
	);
});

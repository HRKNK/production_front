import { type HTMLAttributeAnchorTarget, HTMLAttributes, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import EyeIcon from 'shared/assets/icons/eye.svg';
import classNames from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/deprecated/AppLink/public';
import { Avatar } from 'shared/ui/deprecated/Avatar/public';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Card } from 'shared/ui/deprecated/Card/public';
import { Icon } from 'shared/ui/deprecated/Icon/public';
import { Skeleton } from 'shared/ui/deprecated/Skeleton/public';
import { Text } from 'shared/ui/deprecated/Text/public';
import { AppImage } from 'shared/ui/redesigned/AppImage/public';

import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { type Article, type ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';

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
	const views = // Компонент просмотров
		(
			<>
				<Text text={String(article.views)} className={cls.views} />
				<Icon Svg={EyeIcon} />
			</>
		);

	// BIG view
	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
		return (
			<div data-testid="ArticleListItem" className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
				<Card className={cls.card}>
					<div className={cls.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={cls.username} />
						<Text text={article.createdAt} className={cls.date} />
					</div>
					<Text title={article.title} className={cls.title} />
					{types}
					<AppImage fallback={<Skeleton width={'100%'} height={250} />} src={article.img} className={cls.img} alt={article.title} />
					{textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
					<div className={cls.footer}>
						{/* для таргет бланка */}
						<AppLink target={target} to={RoutePath.articles_details + article.id}>
							<Button theme={ThemeButton.OUTLINE}>
								{' '}
								{/* onClick={onOpenArticle} */}
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
		<AppLink
			data-testid="ArticleListItem"
			target={target}
			to={RoutePath.articles_details + article.id}
			className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
		>
			<Card className={cls.card}>
				{' '}
				{/* onClick={onOpenArticle} */}
				{/* Карточка с аватаром / датой создания */}
				<div className={cls.imageWrapper}>
					<AppImage fallback={<Skeleton width={200} height={200} />} alt={article.title} src={article.img} className={cls.img} />
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

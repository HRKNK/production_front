import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { RoutePath } from 'app/providers/router/config/routeConfig';
import EyeIcon from 'shared/assets/icons/eye.svg';
import classNames from 'shared/lib/classNames/classNames';
import { AppImage } from 'shared/ui/redesigned/AppImage/public';
import { AppLink } from 'shared/ui/redesigned/AppLink/public';
import { Avatar } from 'shared/ui/redesigned/Avatar/public';
import { Button } from 'shared/ui/redesigned/Button/public';
import { Card } from 'shared/ui/redesigned/Card/public';
import { Icon } from 'shared/ui/redesigned/Icon/public';
import { Skeleton } from 'shared/ui/redesigned/Skeleton/public';
import { HStack, VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { type ArticleTextBlock } from '../../../model/types/article';
import { type ArticleListItemProps } from '../ArticleListItem';
import cls from './ArticleListItemRedesigned.module.scss';

// eslint-disable-next-line react/display-name
export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
	const { className, article, view, target } = props;
	const { t } = useTranslation();

	// Компонент типа статьи
	const types = <Text text={article.type.join(', ')} className={cls.types} />;
	// Компонент просмотров
	const views = (
		<HStack gap="8">
			<Icon Svg={EyeIcon} />
			<Text text={String(article.views)} className={cls.views} />
		</HStack>
	);

	// BIG view
	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
		return (
			<Card padding="24" max data-testid="ArticleListItem" className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
				<VStack gap="16" max>
					{/* Автор статьи */}
					<HStack gap="8" max>
						<Avatar size={32} src={article.user.avatar} />
						<Text bold text={article.user.username} />
						<Text text={article.createdAt} />
					</HStack>
					{/* Заголовки */}
					<Text title={article.title} bold className={cls.title} />
					<Text title={article.subtitle} size="s" />
					{types}
					{/* Изображение статьи */}
					<AppImage fallback={<Skeleton width={'100%'} height={250} />} src={article.img} className={cls.img} alt={article.title} />
					{/* Описание статьи. Заголовок блока/Краткое содержание */}
					{textBlock?.paragraphs && <Text text={textBlock.paragraphs.slice(0, 2).join(' ')} className={cls.textBlock} />}
					{/* Кнопка "Подробно" и просмотры */}
					<HStack max justify="between">
						{/* для таргет бланка */}
						<AppLink target={target} to={RoutePath.articles_details + article.id}>
							<Button variant="outline">{t('Читать далее...')}</Button>
						</AppLink>
						{views}
					</HStack>
				</VStack>
			</Card>
		);
	}

	// SMALL view (card type)
	return (
		<AppLink
			data-testid="ArticleListItem"
			target={target}
			to={RoutePath.articles_details + article.id}
			className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
		>
			<Card className={cls.card} border="border_round">
				{/* Изображение статьи */}
				<AppImage fallback={<Skeleton width={200} height={200} />} alt={article.title} src={article.img} className={cls.img} />
				{/* Описание статьи. Заголовок блока/Краткое содержание */}
				<VStack className={cls.info} gap="4">
					<Text title={article.title} className={cls.title} />
					<VStack gap="4" className={cls.footer} max>
						{/* Дата создания и просмотры */}
						<HStack justify="between" max>
							<Text text={article.createdAt} className={cls.date} />
							{views}
						</HStack>
						{/* Автор статьи */}
						<HStack gap="4">
							<Avatar size={32} src={article.user?.avatar} />
							<Text bold text={article.user?.username} />
						</HStack>
					</VStack>
				</VStack>
			</Card>
		</AppLink>
	);
});

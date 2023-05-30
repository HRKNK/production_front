/* eslint-disable react/display-name */
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from 'shared/assets/icons/calendar.svg';
import EyeIcon from 'shared/assets/icons/eye_old.svg';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/deprecated/Avatar/public';
import { Icon } from 'shared/ui/deprecated/Icon/public';
import { Skeleton } from 'shared/ui/deprecated/Skeleton/public';
import { Text, TextAlign, TextSize } from 'shared/ui/deprecated/Text/public';
import { VStack } from 'shared/ui/redesigned/Stack/public';

import { ArticleBlockType } from '../../model/consts/consts';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { type ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	// передается в DynamicModuleLoader
	articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className, id } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const article = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	const renderBlock = useCallback((block: ArticleBlock) => {
		// В зависимости от типа статьи рендерится соответствующий компонент
		switch (block.type) {
			case ArticleBlockType.CODE:
				return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
			case ArticleBlockType.IMAGE:
				return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
			case ArticleBlockType.TEXT:
				return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
			default:
				return null;
		}
	}, []);

	useEffect(() => {
		if (_PROJECT !== 'storybook') {
			void dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<Skeleton className={cls.avatar} width={200} height={200} border="50%" />
				<Skeleton className={cls.title} width={300} height={32} />
				<Skeleton className={cls.skeleton} width={600} height={24} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
				<Skeleton className={cls.skeleton} width="100%" height={200} />
			</>
		);
	} else if (error) {
		content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи.')} />;
	} else {
		content = (
			<>
				{/* Изображение темы / Аватар */}
				<div className={cls.avatarWrapper}>
					<Avatar size={200} src={article?.img} className={cls.avatar} />
				</div>
				{/* Заголовок/Подзаголовок */}
				<Text className={cls.title} title={article?.title} text={article?.subtitle} size={TextSize.L} />
				{/* Просмотры */}
				<div data-testid="ArticleDetails.Info" className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={EyeIcon} />
					<Text text={String(article?.views)} />
				</div>
				{/* Дата создания */}
				<div className={cls.articleInfo}>
					<Icon className={cls.icon} Svg={CalendarIcon} />
					<Text text={article?.createdAt} />
				</div>
				{/* Содержимое статей */}
				{article?.blocks.map(renderBlock)}
			</>
		);
	}

	return (
		// динамически-удаляемый редьюсер
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack gap="16" max className={classNames(cls.ArticleDetails, {}, [className])}>
				{content}
			</VStack>
		</DynamicModuleLoader>
	);
});

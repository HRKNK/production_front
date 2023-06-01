/* eslint-disable react/display-name */
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from 'shared/assets/icons/calendar.svg';
import EyeIcon from 'shared/assets/icons/eye_old.svg';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from 'shared/ui/deprecated/Avatar/public';
import { Icon as IconDeprecated } from 'shared/ui/deprecated/Icon/public';
import { Skeleton as SkeletonDeprecated } from 'shared/ui/deprecated/Skeleton/public';
import { TextAlign, Text as TextDeprecated, TextSize } from 'shared/ui/deprecated/Text/public';
import { AppImage } from 'shared/ui/redesigned/AppImage/AppImage';
import { Avatar } from 'shared/ui/redesigned/Avatar/public';
import { Icon } from 'shared/ui/redesigned/Icon/public';
import { Skeleton } from 'shared/ui/redesigned/Skeleton/Skeleton';
import { VStack } from 'shared/ui/redesigned/Stack/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';

interface ArticleDetailsProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	// передается в DynamicModuleLoader
	articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
	const article = useSelector(getArticleDetailsData);
	return (
		<>
			{/* Изображение темы / Аватар */}
			<div className={cls.avatarWrapper}>
				<AvatarDeprecated size={200} src={article?.img} className={cls.avatar} />
			</div>
			{/* Заголовок/Подзаголовок */}
			<TextDeprecated className={cls.title} title={article?.title} text={article?.subtitle} size={TextSize.L} />
			{/* Просмотры */}
			<div data-testid="ArticleDetails.Info" className={cls.articleInfo}>
				<IconDeprecated className={cls.icon} Svg={EyeIcon} />
				<TextDeprecated text={String(article?.views)} />
			</div>
			{/* Дата создания */}
			<div className={cls.articleInfo}>
				<IconDeprecated className={cls.icon} Svg={CalendarIcon} />
				<TextDeprecated text={article?.createdAt} />
			</div>
			{/* Содержимое статей */}
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};

const Redesigned = () => {
	const article = useSelector(getArticleDetailsData);
	return (
		<>
			{/* Заголовок/Подзаголовок */}
			<Text title={article?.title} size="l" bold />
			<Text title={article?.subtitle} size="l" />

			{/* Изображение темы / Аватар */}
			<AppImage fallback={<Skeleton />} width={'100%'} height={420} src={article?.img} className={cls.img} />

			{/* Содержимое статей */}
			{article?.blocks.map(renderArticleBlock)}
		</>
	);
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
	const { className, id } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isLoading = useSelector(getArticleDetailsIsLoading);
	// const article = useSelector(getArticleDetailsData);
	const error = useSelector(getArticleDetailsError);

	useEffect(() => {
		if (_PROJECT !== 'storybook') {
			void dispatch(fetchArticleById(id));
		}
	}, [dispatch, id]);

	let content;

	if (isLoading) {
		content = (
			<>
				<SkeletonDeprecated className={cls.avatar} width={200} height={200} border="50%" />
				<SkeletonDeprecated className={cls.title} width={300} height={32} />
				<SkeletonDeprecated className={cls.skeleton} width={600} height={24} />
				<SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
				<SkeletonDeprecated className={cls.skeleton} width="100%" height={200} />
			</>
		);
	} else if (error) {
		content = <TextDeprecated align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи.')} />;
	} else {
		content = <ToggleFeatures feature={'isAppRedesigned'} on={<Redesigned />} off={<Deprecated />} />;
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

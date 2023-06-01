import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from 'entities/Article/public';
import { ArticleRating } from 'features/articleRating/public';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList/public';
import { StickyContentLayout } from 'shared/layouts/StickyContentLayout';
import classNames from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from 'shared/lib/features/public';
import { getFeatureFlag } from 'shared/lib/features/setGetFeatures';
import { VStack } from 'shared/ui/redesigned/Stack/public';
import { Page } from 'widgets/Page/Page';

import { articleDetailsPageReducer } from '../../model/slices/public';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props;
	const { t } = useTranslation('article-details');
	const { id } = useParams<{ id: string }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса
	const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<ToggleFeatures
				feature={'isAppRedesigned'}
				on={
					<StickyContentLayout
						content={
							<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
								<VStack max gap="16">
									{/* Список статей */}
									<DetailsContainer></DetailsContainer>
									{/* Блок с отзывами */}
									{isArticleRatingEnabled && <ArticleRating articleId={id}></ArticleRating>}
									{/* Блок с рекомендациями. UPD: Перенесено в фичи */}
									<ArticleRecommendationsList></ArticleRecommendationsList>
									{/* Блок с комментариями. UPD: Перенесено в UI сегмент  */}
									<ArticleDetailsComments id={id}></ArticleDetailsComments>
								</VStack>
							</Page>
						}
						right={<AdditionalInfoContainer></AdditionalInfoContainer>}
					/>
				}
				off={
					<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
						{/* <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
							{t('Назад к списку')}
						</Button> */}

						{/* Тестовый компонент под фича-флаг */}
						{/* <ToggleFeatures feature="isCounterEnabled" on={<Counter />} off={<Card>{t('`name` скоро появится!')}</Card>} /> */}

						{/* Шапка статей */}
						<ArticleDetailsPageHeader></ArticleDetailsPageHeader>
						{/* Список статей */}
						<ArticleDetails id={id}></ArticleDetails>
						{/* Блок с отзывами */}
						{isArticleRatingEnabled && <ArticleRating articleId={id}></ArticleRating>}
						{/* Блок с рекомендациями. UPD: Перенесено в фичи */}
						<ArticleRecommendationsList></ArticleRecommendationsList>
						{/* Блок с комментариями. UPD: Перенесено в UI сегмент  */}
						<ArticleDetailsComments id={id}></ArticleDetailsComments>
					</Page>
				}
			/>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);

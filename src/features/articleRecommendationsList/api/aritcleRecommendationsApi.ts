import { type Article } from 'entities/Article/public';
import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRecommendationsList: build.query<Article[], number>({
			// build.query < (что возвращаем), (что ожидаем на вход) >
			query: (limit) => ({
				url: '/articles',
				params: {
					_limit: limit,
				},
			}),
		}),
	}),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;

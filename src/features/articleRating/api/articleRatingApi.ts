import { type Rating } from 'entities/Rating/public';
import { rtkApi } from 'shared/api/rtkApi';

interface GetArticleRatingArg {
	userId: string;
	articleId: string;
}

interface RateArticleArg {
	userId: string;
	articleId: string;
	rate: number;
	feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRating: build.query<Rating[], GetArticleRatingArg>({
			// query запрос данных
			// build.query < (что возвращаем), (что ожидаем на вход) >
			query: ({ articleId, userId }) => ({
				url: '/article-ratings', // адрес эндпоинта
				params: {
					userId,
					articleId,
				},
			}),
		}),
		rateArticle: build.mutation<void, RateArticleArg>({
			// mutation изменение данных (пост,пут,дэлит)
			// build.query < (что возвращаем), (что ожидаем на вход) >
			query: (arg) => ({
				url: '/article-ratings',
				method: 'POST',
				body: arg,
			}),
		}),
	}),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation; // ртк mutation

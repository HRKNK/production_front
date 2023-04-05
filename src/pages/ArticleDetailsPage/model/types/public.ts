import { type ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { type ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

// группировка типов (обобщающий тип)
export interface ArticleDetailsPageSchema {
	comments: ArticleDetailsCommentsSchema;
	recommendations: ArticleDetailsRecommendationsSchema;
}

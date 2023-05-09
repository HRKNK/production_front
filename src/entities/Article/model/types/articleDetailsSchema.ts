import { type Article } from './article';

export interface ArticleDetailsSchema {
	// для slice
	isLoading: boolean;
	error?: string;
	data?: Article;
}

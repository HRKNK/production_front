import { type Article } from 'entities/Article/public';

export interface ArticleDetailsSchema { // для slice
	isLoading: boolean;
	error?: string;
	data?: Article;
}

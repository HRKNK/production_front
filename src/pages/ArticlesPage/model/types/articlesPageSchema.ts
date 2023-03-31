import { type EntityState } from '@reduxjs/toolkit';
import { type Article, type ArticleView } from 'entities/Article/public';

export interface ArticlesPageSchema extends EntityState<Article> {
	isLoading?: boolean;
	error?: string;

	view: ArticleView;

	// Pagination
	page: number;
	limit?: number;
	hasMore: boolean;

	// init state
	_inited: boolean;
}

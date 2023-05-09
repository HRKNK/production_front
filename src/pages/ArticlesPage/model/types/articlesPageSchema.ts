import { type EntityState } from '@reduxjs/toolkit';

import { type Article, type ArticleSortField, type ArticleType, type ArticleView } from 'entities/Article/public';
import { type SortOrder } from 'shared/types/sort';

export interface ArticlesPageSchema extends EntityState<Article> {
	isLoading?: boolean;
	error?: string;

	// Pagination
	page: number;
	limit: number;
	hasMore: boolean;

	// filters
	view: ArticleView;
	order: SortOrder;
	sort: ArticleSortField;
	search: string;
	type: ArticleType;
	// init state
	_inited: boolean;
}

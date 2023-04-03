import { type EntityState } from '@reduxjs/toolkit';
import { type ArticleType, type ArticleSortField } from 'entities/Article/model/types/article';
import { type Article, type ArticleView } from 'entities/Article/public';
import { type SortOrder } from 'shared/types';

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

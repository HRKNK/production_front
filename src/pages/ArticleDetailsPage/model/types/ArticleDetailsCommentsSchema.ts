import { type EntityState } from '@reduxjs/toolkit';
import { type Comment } from 'entities/Comment/public';

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
	isLoading?: boolean;
	error?: string;
}

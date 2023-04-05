import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

import { type ArticleDetailsPageSchema } from '../types/public';

import { combineReducers } from '@reduxjs/toolkit';

// группировка Reducer через combineReducers
export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
	recommendations: articleDetailsPageRecommendationsReducer,
	comments: articleDetailsCommentsReducer,
});

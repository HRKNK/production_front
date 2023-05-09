import { combineReducers } from '@reduxjs/toolkit';

import { type ArticleDetailsPageSchema } from '../types/public';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

// группировка Reducer через combineReducers
export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
	recommendations: articleDetailsPageRecommendationsReducer,
	comments: articleDetailsCommentsReducer,
});

import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User/public';
import { getArticleDetailsData } from 'entities/Article/public';

// вытащили данные по селекторам и сравнили их
export const getCanEditArticle = createSelector(getArticleDetailsData, getUserAuthData, (article, user) => {
	if (!article || !user) {
		return false;
	}
	return article.user.id === user.id;
},
);

import { type StateSchema } from 'app/providers/storeProvider/public';

export const getArticleCommentsIsLoading = (state: StateSchema) => {
	return state.articleDetailsPage?.comments?.isLoading;
};
export const getArticleCommentsError = (state: StateSchema) => {
	return state.articleDetailsPage?.comments?.error;
};

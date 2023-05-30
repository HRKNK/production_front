import { type HTMLAttributeAnchorTarget, memo } from 'react';

import { ToggleFeatures } from 'shared/lib/features/public';

import { type ArticleView } from '../../model/consts/consts';
import { type Article } from '../../model/types/article';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView; // вид отображения списка
	target?: HTMLAttributeAnchorTarget; // https://www.jsdocs.io/package/@types/react // HTMLAttributeAnchorTarget
}

// eslint-disable-next-line react/display-name
export const ArticleListItem = memo((props: ArticleListItemProps) => {
	return <ToggleFeatures feature={'isAppRedesigned'} on={<ArticleListItemRedesigned {...props} />} off={<ArticleListItemDeprecated {...props} />} />;
});

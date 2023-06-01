import { ArticleBlockType } from '../../model/consts/consts';
import { type ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

export const renderArticleBlock = (block: ArticleBlock) => {
	// В зависимости от типа статьи рендерится соответствующий компонент
	switch (block.type) {
		case ArticleBlockType.CODE:
			return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
		case ArticleBlockType.IMAGE:
			return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
		case ArticleBlockType.TEXT:
			return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
		default:
			return null;
	}
};

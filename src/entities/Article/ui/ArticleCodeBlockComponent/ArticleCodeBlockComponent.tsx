/* eslint-disable react/display-name */
import cls from './ArticleCodeBlockComponent.module.scss';

import { type ArticleCodeBlock } from '../../model/types/article';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Code } from 'shared/ui/Code/Code';

interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
	const { className, block } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
			<Code text={block.code} />
		</div>
	);
});

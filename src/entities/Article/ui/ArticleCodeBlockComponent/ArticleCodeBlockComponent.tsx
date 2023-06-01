/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { Code as CodeDeprecated } from 'shared/ui/deprecated/Code/public';
import { Code } from 'shared/ui/redesigned/Code/public';

import { type ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
	const { className, block } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
			<ToggleFeatures feature={'isAppRedesigned'} on={<Code text={block.code} />} off={<CodeDeprecated text={block.code} />} />
		</div>
	);
});

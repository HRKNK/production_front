/* eslint-disable react/display-name */
import cls from './ArticleTextBlockComponent.module.scss';

import { type ArticleTextBlock } from '../../model/types/article';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/public';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
	const { className, block } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
			{block.title && <Text title={block.title} className={cls.title} />}
			{block.paragraphs.map((paragraph, index) => (
				<Text key={index} text={paragraph} className={cls.paragraph} />
			))}
		</div>
	);
});

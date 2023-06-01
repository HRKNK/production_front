/* eslint-disable react/display-name */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { type ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
	const { className, block } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
			{block.title && (
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<Text title={block.title} className={cls.title} />}
					off={<TextDeprecated title={block.title} className={cls.title} />}
				/>
			)}
			{block.paragraphs.map((paragraph, index) => (
				<ToggleFeatures
					key={index}
					feature={'isAppRedesigned'}
					on={<Text key={index} text={paragraph} className={cls.paragraph} />}
					off={<TextDeprecated key={index} text={paragraph} className={cls.paragraph} />}
				/>
			))}
		</div>
	);
});

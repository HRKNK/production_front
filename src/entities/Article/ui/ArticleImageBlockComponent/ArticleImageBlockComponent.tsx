import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { TextAlign, Text as TextDeprecated } from 'shared/ui/deprecated/Text/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { type ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

// eslint-disable-next-line react/display-name
export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
	const { className, block } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
			<img src={block.src} alt={block.title} className={cls.img} />
			{block.title && (
				<ToggleFeatures
					feature={'isAppRedesigned'}
					on={<Text text={block.title} align="center" />}
					off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
				/>
			)}
		</div>
	);
});

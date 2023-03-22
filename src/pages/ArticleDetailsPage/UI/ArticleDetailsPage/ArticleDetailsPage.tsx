import cls from './ArticleDetailsPage.module.scss';

import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classNames from 'shared/lib/classNames/classNames';

interface ArticleDetailsPageProps {
	className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
			{t('ARTICLE DETAILS')}
		</div>
	);
};

export default memo(ArticleDetailsPage);

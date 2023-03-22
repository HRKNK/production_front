import cls from './ArticleDetailsPage.module.scss';

import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article/public';
import { useParams } from 'react-router-dom';

interface ArticleDetailsPageProps {
	className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const { id } = useParams<{ id: string, }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса

	return (
		<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
			<ArticleDetails id={id}></ArticleDetails>
		</div>
	);
};

export default memo(ArticleDetailsPage);

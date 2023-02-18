import cls from './NotFoundPage.module.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'shared/lib/classNames/classNames';

interface NotFoundPageProps {
	className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
	const { t } = useTranslation('notFoundPage');

	return (
		<div className={classNames(cls.NotFoundPage, {}, [className])}>
			{t('Страница не найдена')}
		</div>
	);
};

export default NotFoundPage;

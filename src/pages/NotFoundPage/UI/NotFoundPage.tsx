import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
	const { t } = useTranslation('notFoundPage');

	return (
		<Page data-testid={'NotFoundPage'} className={classNames(cls.NotFoundPage, {}, [className])}>
			{t('Страница не найдена')}
		</Page>
	);
};

export default NotFoundPage;

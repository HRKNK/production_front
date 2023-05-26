import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/deprecated/Button/public';

import cls from './PageErrorBoundary.module.scss';

interface PageErrorBoundaryProps {
	className?: string;
}

const PageErrorBoundary = ({ className }: PageErrorBoundaryProps) => {
	const { t } = useTranslation();

	const reloadPage = () => {
		location.reload();
	};

	return (
		<div className={classNames(cls.PageErrorBoundary, {}, [className])}>
			<p>{t('Произошла непредвиденная ошибка')}</p>
			<Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
		</div>
	);
};

export default PageErrorBoundary;

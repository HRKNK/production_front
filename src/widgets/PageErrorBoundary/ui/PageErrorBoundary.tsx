import cls from './PageErrorBoundary.module.scss';

import React from 'react';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/ui/Button/Button';

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
			<p>
				{t('Произошла непредвиденная ошибка')}
			</p>
			<Button onClick={reloadPage}>
				{t('Обновить страницу')}
			</Button>
		</div>
	);
};

export default PageErrorBoundary;

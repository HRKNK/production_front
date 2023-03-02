import { Counter } from 'entities/Counter/public';
import React from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
	const { t } = useTranslation('main');

	return (
		<div>
			{t('Главная')}
			<Counter></Counter>
		</div>
	);
};

export default MainPage;

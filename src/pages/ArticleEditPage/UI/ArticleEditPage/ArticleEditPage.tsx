import cls from './ArticleEditPage.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
const ArticleEditPage = memo((props: ArticleEditPageProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const { id } = useParams<{ id: string, }>(); // Обработчик возвращает объект из пар ключ-значение динамических параметров из текущего URL-адреса
	const isEdit = Boolean(id); // если есть id - редактирование, в обратном - создание новой

	return (
		<Page className={classNames(cls.ArticleEditPage, {}, [className])}>
			{isEdit
				? t('Редактирование статьи с ID = ') + id
				: t('Создание новой статьи')}
		</Page>
	);
});

export default ArticleEditPage;

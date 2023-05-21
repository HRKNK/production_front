import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getJsonSettings, saveJsonSettings } from 'entities/User/public';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice';
import { Drawer } from 'shared/ui/Drawer/public';
import { Modal } from 'shared/ui/Modal/public';
import { Text } from 'shared/ui/Text/public';

export const ArticlePageGreeting = memo(() => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false); // состояние модалки
	const dispatch = useAppDispatch();

	const isMobileView = useDevice(); // вид мобильного варианта
	const { isArticlesPageWasOpened } = useSelector(getJsonSettings); // текущее состояние визита

	useEffect(() => {
		if (!isArticlesPageWasOpened) {
			setIsOpen(true);
			void dispatch(saveJsonSettings({ isArticlesPageWasOpened: true })); // меняем флаг на сервере
		}
	}, [dispatch, isArticlesPageWasOpened]);

	const onClose = () => {
		setIsOpen(false);
	};

	const text = <Text title={t('Добро пожаловать на страницу статей')} text={t('Здесь вы можете искать и просматривать статьи на различные темы')} />;

	if (isMobileView) {
		return (
			// lazy
			<Drawer isOpen={isOpen} onClose={onClose}>
				{text}
			</Drawer>
		);
	}

	return (
		<Modal lazy isOpen={isOpen} onClose={onClose}>
			{text}
		</Modal>
	);
});

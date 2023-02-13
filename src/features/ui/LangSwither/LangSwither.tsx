import cls from './LangSwither.module.scss';

import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import Button, { ThemeButton } from 'shared/ui/Button/Button';

interface LangSwitherProps {
	className?: string;
}

const LangSwither = ({ className }: LangSwitherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		void i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button theme={ThemeButton.CLEAR} className={classNames(cls.LangSwither, {}, [className])} onClick={toggle}>
			{t('Язык')}
		</Button>
	);
};

export default LangSwither;

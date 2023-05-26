/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/public';

interface LangSwitherProps {
	className?: string;
	short?: boolean;
}

const LangSwither = memo(({ className, short }: LangSwitherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		void i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button theme={ThemeButton.CLEAR} className={classNames('', {}, [className])} onClick={toggle}>
			{t(short ? 'Язык' : 'Короткий язык')}
		</Button>
	);
});

export default LangSwither;

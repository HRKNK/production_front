/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Button } from 'shared/ui/redesigned/Button/public';

interface LangSwitсherProps {
	className?: string;
	short?: boolean;
}

const LangSwitсher = memo(({ className, short }: LangSwitсherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = () => {
		void i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={<Button variant="clear">{t(short ? 'Язык' : 'Короткий язык')}</Button>}
			off={
				<ButtonDeprecated className={classNames('', {}, [className])} theme={ThemeButton.CLEAR} onClick={toggle}>
					{t(short ? 'Короткий язык' : 'Язык')}
				</ButtonDeprecated>
			}
		/>
	);

	// return (
	// 	<Button theme={ThemeButton.CLEAR} className={classNames('', {}, [className])} onClick={toggle}>
	// 		{t(short ? 'Язык' : 'Короткий язык')}
	// 	</Button>
	// );
});

export default LangSwitсher;

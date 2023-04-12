import { Currency } from '../../model/types/currency';

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/public';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CurrencySelectProps {
	className?: string;
	value?: Currency;
	onChange?: (value: Currency) => void;
	readonly?: boolean;
}

const options = [
	{ value: Currency.RUB, content: Currency.RUB },
	{ value: Currency.EUR, content: Currency.EUR },
	{ value: Currency.USD, content: Currency.USD },
];

// eslint-disable-next-line react/display-name
export const CurrencySelect = memo(({ className, value, onChange, readonly }: CurrencySelectProps) => {
	const { t } = useTranslation();

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Currency);
	}, [onChange]);

	return (
		<ListBox
			className={className}
			value={value}
			defaultValue={t('Укажите валюту')}
			items={options}
			onChange={onChangeHandler}
			readonly={readonly}
		></ListBox>
	);

	/*
	return (
		<Select
			className={classNames('', {}, [className])}
			label={t('Укажите валюту')}
			options={options}
			value={value}
			onChange={onChangeHandler}
			readonly={readonly}
		/>
	);
	*/
});

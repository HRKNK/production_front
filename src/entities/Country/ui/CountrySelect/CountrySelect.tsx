import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/deprecated/ListBox/public';
import { Select } from 'shared/ui/deprecated/Select/public';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
	className?: string;
	value?: Country;
	onChange?: (value: Country) => void;
	readonly?: boolean;
}

const options = [
	{ value: Country.Armenia, content: Country.Armenia },
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
	{ value: Country.Ukraine, content: Country.Ukraine },
];

// eslint-disable-next-line react/display-name
export const CountrySelect = memo(({ className, value, onChange, readonly }: CountrySelectProps) => {
	const { t } = useTranslation();

	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange]
	);

	return (
		<ListBox
			className={className}
			value={value}
			defaultValue={t('Укажите страну')}
			items={options}
			onChange={onChangeHandler}
			readonly={readonly}
		></ListBox>
	);

	/*
	return (
		<Select
			className={classNames('', {}, [className])}
			label={t('Укажите страну')}
			options={options}
			value={value}
			onChange={onChangeHandler}
			readonly={readonly}
		/>
	);
	*/
});

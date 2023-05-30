import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from 'shared/lib/features/public';
import { ListBox as ListBoxDeprecated } from 'shared/ui/deprecated/ListBox/public';
import { ListBox } from 'shared/ui/redesigned/ListBox/public';

import { Currency } from '../../model/types/currency';

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

	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Currency);
		},
		[onChange]
	);

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<ListBox
					direction="top"
					className={className}
					value={value}
					label={t('Укажите валюту')}
					defaultValue={t('Укажите валюту')}
					items={options}
					onChange={onChangeHandler}
					readonly={readonly}
				></ListBox>
			}
			off={
				<ListBoxDeprecated
					className={className}
					value={value}
					defaultValue={t('Укажите валюту')}
					items={options}
					onChange={onChangeHandler}
					readonly={readonly}
				></ListBoxDeprecated>
			}
		/>
	);
});

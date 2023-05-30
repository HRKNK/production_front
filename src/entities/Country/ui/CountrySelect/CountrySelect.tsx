import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from 'shared/lib/features/public';
import { ListBox as ListBoxDeprecated } from 'shared/ui/deprecated/ListBox/public';
import { ListBox } from 'shared/ui/redesigned/ListBox/public';

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
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<ListBox
					direction="top"
					className={className}
					value={value}
					label={t('Укажите страну')}
					defaultValue={t('Укажите страну')}
					items={options}
					onChange={onChangeHandler}
					readonly={readonly}
				></ListBox>
			}
			off={
				<ListBoxDeprecated
					className={className}
					value={value}
					defaultValue={t('Укажите страну')}
					items={options}
					onChange={onChangeHandler}
					readonly={readonly}
				></ListBoxDeprecated>
			}
		/>
	);
});

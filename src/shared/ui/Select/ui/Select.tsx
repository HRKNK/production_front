/* eslint-disable react/display-name */
import cls from './Select.module.scss';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';
import { type ChangeEvent, memo, useMemo } from 'react';

export interface SelectOption {
	value: string;
	content: string;
}

interface SelectProps<T extends string> { // делаем дженерик (расширяет строку)
	className?: string;
	label?: string; // титульник перед селектором
	options?: SelectOption[]; // массив селекторов
	value?: T; // отображение выбранного value
	onChange?: (value: T) => void; // связывание с value
	readonly?: boolean;
}

const typedMemo: <T>(c: T) => T = memo; // обертка-мемоизация для пропс-дженерика
export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
	const { className, label, options, onChange, value, readonly } = props;

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(e.target.value as T);
		}
	};

	const optionsList = useMemo(() => options?.map((opt) => ( // список селекторов
		<option className={cls.option} value={opt.value} key={opt.value}>
			{opt.content}
		</option>
	)), [options]);

	const mods: Mods = {};

	return (
		<div className={classNames(cls.Wrapper, mods, [className])}>
			{label && ( // титульник перед селектором?
				<span className={cls.label}>{`${label}>`}</span>
			)}
			{/* опции селектора */}
			<select disabled={readonly} className={cls.select} value={value} onChange={onChangeHandler}>
				{optionsList}
			</select>
		</div>
	);
});

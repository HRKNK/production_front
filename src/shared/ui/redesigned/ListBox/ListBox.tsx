import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, type ReactNode, useMemo, useState } from 'react';

import ArrowIcon from 'shared/assets/icons/arrow-bottom.svg';
import classNames, { Mods } from 'shared/lib/classNames/classNames';

import { HStack } from '../../redesigned/Stack/public';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/public';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
	value: string;
	content: ReactNode;
	disabled?: boolean;
}

/* // ListBoxItem
const people = [
	{ value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
	{ value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
	{ value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
	{ value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
	{ value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
];
*/

type DropdownDirection = 'top' | 'bottom';

interface ListBoxProps<T extends string> {
	items?: ListBoxItem[]; // список айтемов (селектов)
	className?: string;
	value?: T; // выбранный элемент
	defaultValue?: string; // если элемент не выбран (дэфолт)
	onChange: (value: T) => void; // переключение списка (пропс обязателен)
	readonly?: boolean;
	direction?: DropdownDirection; // направление выпадающего списка
	label?: string; // текст-заголовок перед селектом
}

const mapDirectionClass: Record<DropdownDirection, string> = {
	// маппер на пропс direction
	bottom: cls.optionsBottom,
	top: cls.optionsTop,
};

export function ListBox<T extends string>(props: ListBoxProps<T>) {
	const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom', label } = props;
	const optionsClasses = [mapDirectionClass[direction], cls.menu]; // класс устанавливает пропс direction

	const selectedItem = useMemo(() => {
		return items?.find((item) => item.value === value);
	}, [items, value]);

	return (
		<HStack gap="4">
			{/* текст-заголовок перед селектом */}
			{label && <span>{`${label} `}</span>}
			<HListBox
				disabled={readonly}
				as="div" // в какой тег будет обернут
				className={classNames(cls.ListBox, {}, [className])}
				value={value}
				onChange={onChange}
			>
				{/* Кнопка поведения селектора */}
				<HListBox.Button // disabled={readonly}
					// as = как div (получалась вложенность кнопки в кнопке) <button> cannot appear as a descendant of <button>.
					as="div"
					className={cls.trigger}
				>
					{/* Своя кнопка (кастомная) */}
					<Button addonRight={<Icon Svg={ArrowIcon} />} variant="filled" disabled={readonly}>
						{selectedItem?.content ?? defaultValue}
					</Button>
				</HListBox.Button>
				<HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
					{items?.map((item) => (
						<HListBox.Option
							key={item.value}
							value={item.value} // пункт списка
							disabled={item.disabled} // отключение пунктов
							as={Fragment} // <> </>
						>
							{(
								{ active, selected } // active - ховер, selected - выбранный
							) => (
								<li className={classNames(cls.item, { [cls.active]: active, [cls.disabled]: item.disabled, [cls.selected]: selected })}>
									{/* Для > можно добавить иконку галочки/селектед */}
									{selected && '> '}
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
}

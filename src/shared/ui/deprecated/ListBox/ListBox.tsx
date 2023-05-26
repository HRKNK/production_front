import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, type ReactNode, useState } from 'react';

import classNames, { Mods } from 'shared/lib/classNames/classNames';

import { Button } from '../Button/Button';
import { HStack } from '../Stack/public';
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

interface ListBoxProps {
	items?: ListBoxItem[]; // список айтемов (селектов)
	className?: string;
	value?: string; // выбранный элемент
	defaultValue?: string; // если элемент не выбран (дэфолт)
	onChange: (value: string) => void; // переключение списка (пропс обязателен)
	readonly?: boolean;
	direction?: DropdownDirection; // направление выпадающего списка
	label?: string; // текст-заголовок перед селектом
}

const mapDirectionClass: Record<DropdownDirection, string> = {
	// маппер на пропс direction
	bottom: cls.optionsBottom,
	top: cls.optionsTop,
};

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export function ListBox(props: ListBoxProps) {
	const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom', label } = props;
	const optionsClasses = [mapDirectionClass[direction]]; // класс устанавливает пропс direction

	return (
		<HStack gap="4">
			{/* текст-заголовок перед селектом */}
			{label && <span>{`${label}>`}</span>}
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
					<Button disabled={readonly}>{value ?? defaultValue}</Button>
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
								<li className={classNames(cls.item, { [cls.active]: active, [cls.disabled]: item.disabled })}>
									{/* Для !!! можно добавить иконку галочки/селектед */}
									{selected && '!!!'}
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

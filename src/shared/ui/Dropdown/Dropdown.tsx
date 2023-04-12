import cls from './Dropdown.module.scss';

import AppLink from '../AppLink/AppLink';

import { Menu } from '@headlessui/react';
import classNames from 'shared/lib/classNames/classNames';
import { Fragment, type ReactNode } from 'react';
import { type DropdownDirection } from 'shared/types/ui';

export interface DropdownItem {
	disabled?: boolean;
	content?: ReactNode;
	onClick?: () => void;
	href?: string;
}

interface DropdownProps {
	className?: string;
	items: DropdownItem[]; // айтемы
	direction?: DropdownDirection; // направление выпада
	trigger: ReactNode; // аватарка
}

const mapDirectionClass: Record<DropdownDirection, string> = { // маппер на пропс direction
	'bottom left': cls.optionsBottomLeft,
	'bottom right': cls.optionsBottomRight,
	'top right': cls.optionsTopRight,
	'top left': cls.optionsTopLeft,
};

export function Dropdown (props: DropdownProps) {
	const { className, trigger, items, direction = 'bottom right' } = props;

	const menuClasses = [mapDirectionClass[direction]]; // класс устанавливает пропс direction

	return (
		<Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
			<Menu.Button className={cls.btn}>
				{/* Аватарка */}
				{trigger}
			</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
				{items.map((item) => {
					const content = ({ active }: { active: boolean, }) => (
						<button type='button' disabled={item.disabled}
							onClick={item.onClick}
							className={classNames(cls.item, { [cls.active]: active })}
						>
							{item.content}
						</button>
					);

					if (item.href) { // если пропс имеет ссылку -> заворачиваем в AppLink
						return ( // as = во что обернуть
							<Menu.Item key={item.href} as={AppLink} to={item.href} disabled={item.disabled}>
								{content}
							</Menu.Item>
						);
					}

					return ( // as = во что обернуть
						<Menu.Item key={item.href} as={Fragment} disabled={item.disabled}>
							{content}
						</Menu.Item>
					);
				})}

			</Menu.Items>
		</Menu>
	);
}

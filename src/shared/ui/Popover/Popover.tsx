import cls from './Popover.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { type DropdownDirection } from 'shared/types/ui';
import { type ReactNode } from 'react';

interface PopoverProps {
	className?: string;
	direction?: DropdownDirection; // направление списка
	trigger: ReactNode; // иконка уведомлений
	children: ReactNode; // контент внутри выпадающего списка
}

const mapDirectionClass: Record<DropdownDirection, string> = { // маппер на пропс direction
	'bottom left': cls.optionsBottomLeft,
	'bottom right': cls.optionsBottomRight,
	'top right': cls.optionsTopRight,
	'top left': cls.optionsTopLeft,
};

export function Popover (props: PopoverProps) {
	const { className, trigger, direction = 'bottom right', children } = props;
	const menuClasses = [mapDirectionClass[direction]]; // класс устанавливает пропс direction

	return (
		<HPopover className={classNames(cls.Popover, {}, [className, cls.popup])}>
			<HPopover.Button className={cls.trigger}>
				{trigger}
			</HPopover.Button>

			<HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
				{children}
			</HPopover.Panel>
		</HPopover>
	);
}

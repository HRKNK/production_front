import cls from './NotificationButton.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification/public';
import { Popover } from 'shared/ui/Popover/Popover';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice';

interface NotificationButtonProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const NotificationButton = memo((props: NotificationButtonProps) => {
	const { className } = props;

	// для Дровера мобильной версии
	const [isOpen, setIsOpen] = useState(false);
	const onOpenDrawer = useCallback(() => {
		setIsOpen(true);
	}, []);
	const onCloseDrawer = useCallback(() => {
		setIsOpen(false);
	}, []);

	const trigger = ( // Иконка-кнопка
		<Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	);

	const isMobileView = useDevice(); // вид мобильного варианта

	return (
		isMobileView
			? <>
				{trigger}
				<Drawer isOpen={isOpen} onClose={onCloseDrawer}>
					<NotificationList />
				</Drawer>
			</>
			: <Popover
				className={classNames(cls.NotificationButton, {}, [className])}
				direction='bottom left'
				trigger={trigger}
			>
				<NotificationList className={cls.notifications} />
			</Popover>
	);
});

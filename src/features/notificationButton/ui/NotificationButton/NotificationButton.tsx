import React, { memo, useCallback, useState } from 'react';

import { NotificationList } from 'entities/Notification/public';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import classNames from 'shared/lib/classNames/classNames';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider/public';
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice';
import { Button, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Drawer } from 'shared/ui/deprecated/Drawer/public';
import { Icon } from 'shared/ui/deprecated/Icon/public';
import { Popover } from 'shared/ui/deprecated/Popover/public';

import cls from './NotificationButton.module.scss';

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

	const trigger = // Иконка-кнопка
		(
			<Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
				<Icon Svg={NotificationIcon} inverted />
			</Button>
		);

	const isMobileView = useDevice(); // вид мобильного варианта

	return isMobileView ? (
		<>
			{trigger}
			{/* Контекст провайдер / Ленивая загрузка */}
			<Drawer isOpen={isOpen} onClose={onCloseDrawer}>
				<NotificationList />
			</Drawer>
		</>
	) : (
		<Popover className={classNames(cls.NotificationButton, {}, [className])} direction="bottom left" trigger={trigger}>
			<NotificationList className={cls.notifications} />
		</Popover>
	);
});

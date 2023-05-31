import React, { memo, useCallback, useState } from 'react';

import { NotificationList } from 'entities/Notification/public';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import NotificationIconDeprecated from 'shared/assets/icons/notification_old.svg';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Icon as IconDeprecated } from 'shared/ui/deprecated/Icon/public';
import { Popover as PopoverDeprecated } from 'shared/ui/deprecated/Popover/public';
import { Drawer } from 'shared/ui/redesigned/Drawer/public';
import { Icon } from 'shared/ui/redesigned/Icon/public';
import { Popover } from 'shared/ui/redesigned/Popover/public';

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

	// Иконка-кнопка
	const trigger = (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
			off={
				<ButtonDeprecated onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
					<IconDeprecated Svg={NotificationIconDeprecated} inverted />
				</ButtonDeprecated>
			}
		/>
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
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Popover className={classNames(cls.NotificationButton, {}, [className])} direction="bottom left" trigger={trigger}>
					<NotificationList className={cls.notifications} />
				</Popover>
			}
			off={
				<PopoverDeprecated className={classNames(cls.NotificationButton, {}, [className])} direction="bottom left" trigger={trigger}>
					<NotificationList className={cls.notifications} />
				</PopoverDeprecated>
			}
		/>
	);
});

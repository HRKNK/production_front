import cls from './NotificationButton.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification/public';
import { Popover } from 'shared/ui/Popover/Popover';

interface NotificationButtonProps {
	className?: string;
}

// eslint-disable-next-line react/display-name
export const NotificationButton = memo((props: NotificationButtonProps) => {
	const { className } = props;

	return (
		<Popover
			className={classNames(cls.NotificationButton, {}, [className])}
			direction='bottom left'
			trigger={(
				<Button theme={ThemeButton.CLEAR}>
					<Icon Svg={NotificationIcon} inverted />
				</Button>
			)}
		>
			<NotificationList className={cls.notifications} />
		</Popover>
	);
});

import cls from './NotificationItem.module.scss';

import { type Notification } from '../../model/types/notification';

import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/public';
import { Text } from 'shared/ui/Text/public';

interface NotificationItemProps {
	className?: string;
	item: Notification;
}

// eslint-disable-next-line react/display-name
export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className, item } = props;

	// Карточка с уведомлением
	const content = (
		<Card theme={CardTheme.OUTLINED} className={classNames(cls.NotificationItem, {}, [className])}>
			<Text title={item.title} text={item.description} />
		</Card>
	);

	if (item.href) { // Если в уведомлении есть ссылка
		return (
			<a className={cls.link} target='_blank' href={item.href} rel='noreferrer'>
				{content}
			</a>
		);
	}

	return content;
});

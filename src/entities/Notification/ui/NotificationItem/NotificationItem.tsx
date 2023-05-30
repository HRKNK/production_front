import { memo } from 'react';

import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { Card as CardDeprecated, CardTheme } from 'shared/ui/deprecated/Card/public';
import { Text as TextDeprecated } from 'shared/ui/deprecated/Text/public';
import { Card } from 'shared/ui/redesigned/Card/public';
import { Text } from 'shared/ui/redesigned/Text/public';

import { type Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
	className?: string;
	item: Notification;
}

// eslint-disable-next-line react/display-name
export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className, item } = props;

	// Карточка с уведомлением
	const content = (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card border="border_normal" variant="outlined" className={classNames(cls.NotificationItem, {}, [className])}>
					<Text title={item.title} text={item.description} />
				</Card>
			}
			off={
				<CardDeprecated theme={CardTheme.OUTLINED} className={classNames(cls.NotificationItem, {}, [className])}>
					<TextDeprecated title={item.title} text={item.description} />
				</CardDeprecated>
			}
		/>
	);

	if (item.href) {
		// Если в уведомлении есть ссылка
		return (
			<a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
				{content}
			</a>
		);
	}

	return content;
});

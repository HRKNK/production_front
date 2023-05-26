import { type CSSProperties, useMemo } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import UserIcon from '../../../../assets/icons/user-filled.svg';
import { AppImage } from '../../../redesigned/AppImage/public';
import { Icon } from '../../Icon/public';
import { Skeleton } from '../../Skeleton/public';
import cls from './Avatar.module.scss';

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number; // размер извне
	alt?: string;
	fallbackInverted?: boolean; // инверсия цвета
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const Avatar = ({ className, src, size, alt, fallbackInverted }: AvatarProps) => {
	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(
		() => ({
			// useMemo кеширование инлайн стилей
			width: size || 100,
			height: size || 100,
		}),
		[size]
	);

	const fallback = <Skeleton width={size} height={size} border="50%" />;
	const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />;

	return (
		<AppImage
			fallback={fallback}
			errorFallback={errorFallback}
			src={src}
			alt={alt}
			style={styles}
			className={classNames(cls.Avatar, mods, [className])}
		/>
	);
};

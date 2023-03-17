import cls from './Avatar.module.scss';

import { type CSSProperties, useMemo } from 'react';
import classNames, { type Mods } from 'shared/lib/classNames/classNames';

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number; // размер извне
	alt?: string;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(() => ({ // useMemo кеширование инлайн стилей
		width: size || 100,
		height: size || 100,
	}), [size]);

	return (
		<img
			src={src}
			alt={alt}
			style={styles}
			className={classNames(cls.Avatar, mods, [className])}
		/>
	);
};
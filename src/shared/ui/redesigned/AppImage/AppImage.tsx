import { type ImgHTMLAttributes, type ReactElement, memo, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	// HTMLImageElement = src, alt
	className?: string;
	fallback?: ReactElement; // нода загрузки
	errorFallback?: ReactElement; // запасная нода
}

export const AppImage = memo((props: AppImageProps) => {
	const { className, src, alt = 'image', errorFallback, fallback, ...otherProps } = props;
	const [isLoading, setIsLoading] = useState(true); // состояние загрузки изображения
	const [hasError, setHasError] = useState(false); // запасной вариант в случае ошибки загрузки

	// вызывается до монтирования объекта (синхронно)
	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			// изображение загружено
			setIsLoading(false);
		};
		img.onerror = () => {
			setIsLoading(false);
			setHasError(true);
		};
	}, [src]);

	if (isLoading && fallback) {
		// загрузка + нода загрузки
		return fallback;
	}

	if (hasError && errorFallback) {
		// ошибка загрузки + запасная нода
		return errorFallback;
	}

	return <img className={className} src={src} alt={alt} {...otherProps} />;
});

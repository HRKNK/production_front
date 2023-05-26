import classNames from 'shared/lib/classNames/classNames';

import Loader from '../Loader/ui/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
	className?: string;
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const PageLoader = ({ className }: PageLoaderProps) => (
	<div className={classNames(cls.PageLoader, {}, [className])}>
		<Loader />
	</div>
);

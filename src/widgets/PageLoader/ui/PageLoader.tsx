import classNames from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/public';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
	className?: string;
}

const PageLoader = ({ className }: PageLoaderProps) => {
	return (
		<div className={classNames(cls.PageLoader, {}, [className])}>
			<Loader></Loader>
		</div>
	);
};

export default PageLoader;

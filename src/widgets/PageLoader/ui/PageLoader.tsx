import cls from './PageLoader.scss';

import classNames from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/public';

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

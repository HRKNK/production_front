import cls from './ArticleViewSelector.module.scss';

import { ArticleView } from '../../model/types/article';

import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list.svg';
import TiledIcon from 'shared/assets/icons/tiled.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import Button, { ThemeButton } from 'shared/ui/Button/Button';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		icon: TiledIcon,
	},
	{
		view: ArticleView.BIG,
		icon: ListIcon,
	},
];

// eslint-disable-next-line react/display-name
export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
			{viewTypes.map((viewType, id) => (
				<Button key={id} theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
					<Icon Svg={viewType.icon} className={classNames('', { [cls.notSelected]: viewType.view !== view })}/>
				</Button>
			))}
		</div>
	);
});
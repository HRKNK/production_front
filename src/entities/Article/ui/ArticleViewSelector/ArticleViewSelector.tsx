import { memo } from 'react';

import ListIcon from 'shared/assets/icons/burger.svg';
import ListIconDeprecated from 'shared/assets/icons/list.svg';
import TiledIcon from 'shared/assets/icons/tile.svg';
import TiledIconDeprecated from 'shared/assets/icons/tiled.svg';
import classNames from 'shared/lib/classNames/classNames';
import { ToggleFeatures } from 'shared/lib/features/public';
import { toggleFeatures } from 'shared/lib/features/toggleFeatures';
import { Button as ButtonDeprecated, ThemeButton } from 'shared/ui/deprecated/Button/public';
import { Icon as IconDeprecated } from 'shared/ui/deprecated/Icon/public';
import { Card } from 'shared/ui/redesigned/Card/public';
import { Icon } from 'shared/ui/redesigned/Icon/public';
import { HStack } from 'shared/ui/redesigned/Stack/public';

import { ArticleView } from '../../model/consts/consts';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			on: () => TiledIcon,
			off: () => TiledIconDeprecated,
		}),
	},
	{
		view: ArticleView.BIG,
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			on: () => ListIcon,
			off: () => ListIconDeprecated,
		}),
	},
];

// eslint-disable-next-line react/display-name
export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<ToggleFeatures
			feature={'isAppRedesigned'}
			on={
				<Card border="border_round" className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}>
					{/* <HStack gap="8"> */}
					{viewTypes.map((viewType) => (
						<Icon
							key={viewType.view}
							clickable
							onClick={onClick(viewType.view)}
							Svg={viewType.icon}
							className={classNames('', { [cls.notSelected]: viewType.view !== view })}
						/>
					))}
					{/* </HStack> */}
				</Card>
			}
			off={
				<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
					{viewTypes.map((viewType) => (
						<ButtonDeprecated key={viewType.view} theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
							<IconDeprecated width={24} height={24} Svg={viewType.icon} className={classNames('', { [cls.notSelected]: viewType.view !== view })} />
						</ButtonDeprecated>
					))}
				</div>
			}
		/>
	);
});

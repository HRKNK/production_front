/* eslint-disable react/display-name */
import { memo, useCallback } from 'react';

import CopyIcon from 'shared/assets/icons/copy.svg';
import classNames from 'shared/lib/classNames/classNames';

import { Icon } from '../Icon/public';
import cls from './Code.module.scss';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code = memo((props: CodeProps) => {
	const { className, text } = props;

	const onCopy = useCallback(() => {
		void navigator.clipboard.writeText(text); // запись текста в буфер (копирование)
	}, [text]);

	return (
		// тег pre сохраняет исходные отступы
		<pre className={classNames(cls.CodeRedesigned, {}, [className])}>
			<Icon clickable onClick={onCopy} className={cls.copyBtn} Svg={CopyIcon}></Icon>
			<code>
				{/* HTML5 тег для кода */}
				{text}
			</code>
		</pre>
	);
});

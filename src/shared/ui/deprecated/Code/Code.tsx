/* eslint-disable react/display-name */
import { memo, useCallback } from 'react';

import CopyIcon from 'shared/assets/icons/copy_old.svg';
import classNames from 'shared/lib/classNames/classNames';

import { Button, ThemeButton } from '../Button/Button';
import cls from './Code.module.scss';

interface CodeProps {
	className?: string;
	text: string;
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
export const Code = memo((props: CodeProps) => {
	const { className, text } = props;

	const onCopy = useCallback(() => {
		void navigator.clipboard.writeText(text); // запись текста в буфер (копирование)
	}, [text]);

	return (
		// тег pre сохраняет исходные отступы
		<pre className={classNames(cls.Code, {}, [className])}>
			<Button onClick={onCopy} className={cls.copyBtn} theme={ThemeButton.CLEAR}>
				<CopyIcon className={cls.copyIcon} />
			</Button>
			<code>
				{' '}
				{/* HTML5 тег для кода */}
				{text}
			</code>
		</pre>
	);
});

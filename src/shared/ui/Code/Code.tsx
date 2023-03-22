/* eslint-disable react/display-name */
import cls from './Code.module.scss';

import classNames from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import CopyIcon from 'shared/assets/icons/copy.svg';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code = memo((props: CodeProps) => {
	const { className, text } = props;

	const onCopy = useCallback(() => {
		void navigator.clipboard.writeText(text);
	}, [text]);

	return (
		<pre className={classNames(cls.Code, {}, [className])}>
			<Button onClick={onCopy} className={cls.copyBtn} theme={ThemeButton.CLEAR}>
				<CopyIcon className={cls.copyIcon} />
			</Button>
			<code>
				{text}
			</code>
		</pre>
	);
});

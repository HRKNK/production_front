/* eslint-disable react/display-name */
import React, { type InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';

import classNames, { type Mods } from 'shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>;
// Omit позволяет забрать все типы исключив (value / onChange)

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autoFocus?: boolean;
	readonly?: boolean;
}

/**
 * @deprecated Устарело, используйте новый компонент редизайна
 */
const Input = memo((props: InputProps) => {
	const { className, value, onChange, placeholder, autoFocus, readonly, type = 'text', ...otherProps } = props;

	const [isFocus, setIsFocus] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	const isCaretVisible = isFocus && !readonly;

	const onBlur = () => {
		setIsFocus(false);
	};
	const onFocus = () => {
		setIsFocus(true);
	};
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};
	const onSelect = (e: any) => {
		setCaretPosition(e?.target?.selectionStart || 0);
	};
	const ref = useRef<HTMLInputElement>();
	useEffect(() => {
		if (autoFocus) {
			setIsFocus(true);
			ref.current?.focus();
		}
	}, [autoFocus]);

	const mods: Mods = {
		[cls.readonly]: readonly,
	};

	return (
		<div className={classNames(cls.inputWrapper, mods, [className])}>
			{placeholder && <div>{`${placeholder} >`}</div>}
			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					type={type}
					value={value}
					onBlur={onBlur}
					onSelect={onSelect}
					onFocus={onFocus}
					onChange={onChangeHandler}
					className={cls.input}
					readOnly={readonly}
					{...otherProps}
				/>
				{isCaretVisible && <span style={{ left: `${caretPosition * 9}px` }} className={cls.caret}></span>}
				{/* {isFocus && <span style={{ left: `${caretPosition * 9}px` }} className={cls.caret}></span>} */}
			</div>
		</div>
	);
});

export default Input;

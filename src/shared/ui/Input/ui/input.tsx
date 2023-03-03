/* eslint-disable react/display-name */
import cls from './Input.module.scss';

import React, { memo, useEffect, useRef, useState, type InputHTMLAttributes } from 'react';
import classNames from 'shared/lib/classNames/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;
// Omit позволяет забрать все типы исключив (value / onChange)

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
}

const Input = memo((props: InputProps) => {
	const { className, value, onChange, placeholder, autoFocus, type = 'text', ...otherProps } = props;

	const [isFocus, setIsFocus] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	const onBlur = () => { setIsFocus(false); };
	const onFocus = () => { setIsFocus(true); };
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

	return (
		<div className={classNames(cls.inputWrapper, {}, [className])}>
			{placeholder && <div>{`${placeholder} >`}</div>}
			<div className={cls.caretWrapper}>
				<input ref={ref} type={type} value={value} onBlur={onBlur} onSelect={onSelect} onFocus={onFocus} onChange={onChangeHandler} className={cls.input}/>
				{isFocus && <span style={{ left: `${caretPosition * 9}px` }} className={cls.caret}></span>}
			</div>
		</div>
	);
});

export default Input;

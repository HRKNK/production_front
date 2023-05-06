/* eslint-disable i18next/no-literal-string */
import React, { useEffect, useState } from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/public';

const BugButton = () => { // Компонент тестирования (Fake Error)
	const [error, setError] = useState(false);

	const onThrow = () => {
		setError(prev => !prev);
	};

	useEffect(() => {
		if (error) { throw new Error('Fake Error'); }
	}, [error]);

	return (
		<Button onClick={onThrow}>Throw Err</Button>
	);
};

export default BugButton;

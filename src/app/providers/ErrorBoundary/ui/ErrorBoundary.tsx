/* eslint-disable n/handle-callback-err */
// https://ru.reactjs.org/docs/error-boundaries.html
import React, { type ErrorInfo, type ReactNode, Suspense } from 'react';

import { PageErrorBoundary } from 'widgets/PageErrorBoundary/public';
import { PageLoader } from 'widgets/PageLoader/public';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		// Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
		console.log(error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return (
				<Suspense fallback={<PageLoader />}>
					<PageErrorBoundary />
				</Suspense>
			);
		}

		return children;
	}
}

export default ErrorBoundary;

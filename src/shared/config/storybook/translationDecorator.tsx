// https://react.i18next.com/misc/testing
import i18n from '../I18n/i18n';

import { type Story } from '@storybook/react';
import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

export const translationDecorator = (StoryComponent: Story) => {
	return (
		<I18nextProvider i18n={i18n}>
			<Suspense fallback=''>
				<StoryComponent/>
			</Suspense>
		</I18nextProvider>
	);
};

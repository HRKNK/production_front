// https://react.i18next.com/misc/testing
import { render } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18nft from 'shared/config/I18n/i18n-for-test';

const renderWithTranslation = (component: ReactNode) => {
	return render(<I18nextProvider i18n={i18nft}>{component}</I18nextProvider>);
};
export default renderWithTranslation;

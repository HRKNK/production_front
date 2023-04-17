import { type Story } from '@storybook/react';
import { Suspense } from 'react';

export const suspenseDecorator = (StoryComponent: Story) => (
	<Suspense>
		<StoryComponent />
	</Suspense>
);

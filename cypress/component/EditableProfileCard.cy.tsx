import { afterEach, beforeEach, cy, describe, it } from 'local-cypress';

import { EditableProfileCard } from 'features/editableProfileCard/public';
import { TestProvider } from 'shared/lib/tests/componentRender';

const USER_ID = '0';

// Изолированные тесты на компоненты
describe('EditableProfileCard.cy.tsx', () => {
	it('playground', () => {
		cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' }); // Запрос, Маршрут, Фикстура (заранее записанный ответ бэкенда)
		cy.mount(
			// Монритование
			<TestProvider
				option={{
					initialState: {
						user: {
							authData: {
								id: USER_ID,
							},
						},
					},
				}}
			>
				<EditableProfileCard id={USER_ID} />
			</TestProvider>
		);
	});
});

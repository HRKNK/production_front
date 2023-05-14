/* eslint-disable @typescript-eslint/method-signature-style */

/* eslint-disable @typescript-eslint/no-namespace */
import { cy } from 'local-cypress';

// Сценарий обновления профиля
export const updateProfile = (firstname: string, lastname: string) => {
	cy.getByTestId('EditableProfileCardHeader.EditButton').click();
	cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
	cy.getByTestId('EditableProfileCardHeader.SaveButton').click();

	cy.getByTestId('EditableProfileCardHeader.EditButton').click();
	cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
	cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

// Сценарий перезаписи (сброса) данных тестового пользователя
export const resetProfile = (profileId: string) => {
	return cy.request({
		method: 'PUT',
		url: `http://localhost:8000/profile/${profileId}`,
		headers: { Authorization: 'name' },
		body: {
			id: '0',
			first: 'TestName',
			lastname: 'TestName',
			age: 1,
			currency: 'RUB',
			country: 'Russia',
			city: 'Moscow',
			username: 'testName',
			avatar: '',
		},
	});
};

// Декларация/типизация для команд (Например: в updateProfile уходит типизация)
declare global {
	namespace Cypress {
		interface Chainable {
			updateProfile(firstname: string, lastname: string): Chainable<void>;
			resetProfile(profileId: string): Chainable<void>;
		}
	}
}

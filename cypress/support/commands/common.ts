import { cy } from 'local-cypress';

import { type User } from 'entities/User/public';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { selectByTestId } from '../../helpers/selectByTestId';

export const login = (username: string = 'test', password: string = '123') => {
	// return позволяет достать данные из запроса. Например: User.id
	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/login',
			body: {
				username,
				password,
			},
		})
		.then(({ body }) => {
			window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
			return body;
		});
};

// cy.getByTestId
export const getByTestId = (testId: string) => {
	return cy.get(selectByTestId(testId));
};

// Декларация/типизация для команд (Например: в login уходит типизация)
declare global {
	namespace Cypress {
		interface Chainable {
			login(email?: string, password?: string): Chainable<User>;
			getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}

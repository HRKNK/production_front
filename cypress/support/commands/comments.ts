/* eslint-disable @typescript-eslint/method-signature-style */

/* eslint-disable @typescript-eslint/no-namespace */
import { cy } from 'local-cypress';

// Сценарий ввода комментария
export const addComment = (text: string) => {
	cy.getByTestId('AddCommentForm.Input').type(text);
	cy.getByTestId('AddCommentForm.Button').click();
};

// Декларация/типизация для команд (Например: в addComment уходит типизация)
declare global {
	namespace Cypress {
		interface Chainable {
			addComment(text: string): Chainable<void>;
		}
	}
}

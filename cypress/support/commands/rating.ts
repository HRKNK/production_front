/* eslint-disable @typescript-eslint/method-signature-style */

/* eslint-disable @typescript-eslint/no-namespace */
import { cy } from 'local-cypress';

// Сценарий установки оценки
export const setRate = (starsCount = 5, feedback = 'feedback') => {
	cy.getByTestId(`StarRating.${starsCount}`).click();
	cy.getByTestId('RatingCard.Input').type(feedback);
	cy.getByTestId('RatingCard.Send').click();
};

// Декларация/типизация для команд (Например: в addComment уходит типизация)
declare global {
	namespace Cypress {
		interface Chainable {
			setRate(starsCount: number, feedback: string): Chainable<void>;
		}
	}
}

import { beforeEach, cy, describe, it } from 'local-cypress';

import { selectByTestId } from '../../helpers/selectByTestId';

describe('Маршрутизация', () => {
	describe('Пользователь: не авторизован', () => {
		it('Переход на страницу "MainPage"', () => {
			cy.visit('/'); // переход на страницу
			cy.get(selectByTestId('MainPage')).should('exist'); // should - должен => exist - существовать на странице
		});
		it('Переход на страницу "ProfilePage"', () => {
			cy.visit('/profile/1'); // переход на страницу
			cy.get(selectByTestId('MainPage')).should('exist'); // should - должен => exist - существовать на странице
		});
		it('Переход на страницу "NotFoundPage"', () => {
			cy.visit('/unknown'); // переход на страницу
			cy.get(selectByTestId('NotFoundPage')).should('exist'); // should - должен => exist - существовать на странице
		});
	});
	describe('Пользователь: авторизован', () => {
		beforeEach(() => {
			cy.login(); // support/commands
		});
		it('Переход на страницу "ProfilePage"', () => {
			cy.visit('/profile/1'); // переход на страницу
			cy.get(selectByTestId('ProfilePage')).should('exist'); // should - должен => exist - существовать на странице
		});

		it('Переход на страницу "ArticlesPage"', () => {
			cy.visit('/articles'); // переход на страницу
			cy.get(selectByTestId('ArticlesPage')).should('exist'); // should - должен => exist - существовать на странице
		});
	});
});

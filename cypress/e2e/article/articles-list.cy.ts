import { beforeEach, cy, describe, it } from 'local-cypress';

describe('Переход на страницу статей', () => {
	beforeEach(() => {
		// Выполнить перед каждым тестом
		cy.login().then((data) => {
			cy.visit('articles'); // Затем переход на страницу статей
		});
	});
	it('Страница статей загружена', () => {
		cy.getByTestId('ArticleList').should('exist'); // should - должен => exist - существовать на странице
		cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3); // кол-во существующих элементов статей >= 3
	});

	it('Страница статей загружена (fixtures)', () => {
		// МОК запроса
		cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' }); // Запрос, Маршрут, Фикстура (заранее записанный ответ бэкенда)
		cy.getByTestId('ArticleList').should('exist'); // should - должен => exist - существовать на странице
		cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3); // кол-во существующих элементов статей >= 3
	});
});

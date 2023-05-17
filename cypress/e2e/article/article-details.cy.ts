import { afterEach, beforeEach, cy, describe, it } from 'local-cypress';

let currentArticleId = '';

describe('Переход на страницу статей', () => {
	beforeEach(() => {
		// Выполнить перед каждым тестом
		cy.login(); // Авторизация
		// Создаем статью
		cy.createArticle().then((article) => {
			currentArticleId = article.id;
			cy.visit(`articles/${article.id}`); // Затем переход на созданную страницу статьи
		});
	});
	afterEach(() => {
		// После каждого теста (удаляем статью)
		cy.removeArticle(currentArticleId);
	});
	it('Статья загружена', () => {
		cy.getByTestId('ArticleDetails.Info').should('exist'); // should - должен => exist - существовать на странице
	});
	it('Загружены рекомендации', () => {
		cy.getByTestId('ArticleRecommendationsList').should('exist'); // should - должен => exist - существовать на странице
	});
	it('Ввод комментария', () => {
		cy.getByTestId('ArticleDetails.Info').should('exist'); // should - должен => exist - существовать на странице
		cy.getByTestId('AddCommentForm').scrollIntoView(); // скролл к указанному элементу
		cy.addComment('More word'); // Ввод комментария
		cy.getByTestId('CommentCard.Content').should('have.length', 1); // 1-ин комментарий существует на странице
	});
	it('Установка оценки', () => {
		// МОК запроса
		cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' }); // Запрос, Маршрут, Фикстура (заранее записанный ответ бэкенда)
		cy.getByTestId('ArticleDetails.Info').should('exist'); // should - должен => exist - существовать на странице
		cy.getByTestId('RatingCard').scrollIntoView(); // скролл к указанному элементу
		cy.setRate(4, 'feedback'); // Установка оценки
		cy.get('[data-selected=true]').should('have.length', 4); // Оценка 4
	});

	// Пример пропуска теста
	it.skip('Пример пропуска теста', () => {
		cy.getByTestId('ERROR').should('exist');
	});
});

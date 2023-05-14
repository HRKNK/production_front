/* eslint-disable @typescript-eslint/method-signature-style */

/* eslint-disable @typescript-eslint/no-namespace */
import { cy } from 'local-cypress';

import { type Article } from 'entities/Article/public';

const defaultArticle = {
	title: 'Test header',
	subtitle: 'Subtitle',
	img: 'https://png.pngtree.com/element_our/png_detail/20190103/gazettemedianewsnewsletternewspaper-purple-business-logo-png_307881.jpg',
	views: 100,
	createdAt: '01.01.2000',
	userId: '1',
	type: ['SCIENCE'],
	blocks: [''],
};

// Сценарий создания статьи
export const createArticle = (article?: Article) => {
	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/articles',
			headers: { Authorization: 'name' },
			body: article ?? defaultArticle,
		})
		.then((resp) => resp.body);
};

// Сценарий удаления статьи
export const removeArticle = (articleId: string) => {
	return cy.request({
		method: 'DELETE',
		url: `http://localhost:8000/articles/${articleId}`,
		headers: { Authorization: 'name' },
	});
};

// Декларация/типизация для команд (Например: в updateProfile уходит типизация)
declare global {
	namespace Cypress {
		interface Chainable {
			createArticle(article?: Article): Chainable<Article>;
			removeArticle(articleId: string): Chainable<void>;
		}
	}
}

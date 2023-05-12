/* eslint-disable @typescript-eslint/triple-slash-reference */

/* eslint-disable @typescript-eslint/method-signature-style */

/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
import { Cypress, cy } from 'local-cypress';

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

Cypress.Commands.add('login', (username: string = 'admin', password: string = '123') => {
	cy.request({
		method: 'POST',
		url: `http://localhost:8000/login`,
		body: {
			grant_type: 'password',
			username,
			password,
		},
	}).then(({ body }) => {
		window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
		cy.visit('/');
	});
});

declare global {
	namespace Cypress {
		interface Chainable {
			login(username?: string, password?: string): Chainable<void>;
			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
			// dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>;
		}
	}
}

export {};

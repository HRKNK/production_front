import { afterEach, beforeEach, cy, describe, it } from 'local-cypress';

let profileId = '';

describe('Открытие страницы пользователя', () => {
	beforeEach(() => {
		// Выполнить перед каждым тестом
		cy.login().then((data) => {
			profileId = data.id;
			cy.visit(`profile/${data.id}`); // Затем переход на страницу авторизованного пользователя
		});
	});
	afterEach(() => {
		// После каждого теста
		cy.resetProfile(profileId); // Сценарий: commands/profile.ts
	});
	it('Профиль загружен', () => {
		cy.getByTestId('ProfileCard.firstname').should('have.value', 'TestName'); // Поля имеют значение: TestName
	});
	it('Редактирование профиля', () => {
		const profileFirstname = 'firstname';
		const profileLastname = 'lastname';
		cy.updateProfile(profileFirstname, profileLastname); // Сценарий: commands/profile.ts
		cy.getByTestId('ProfileCard.firstname').should('have.value', profileFirstname); // Поля имеют значение: firstname
		cy.getByTestId('ProfileCard.lastname').should('have.value', profileLastname); // Поля имеют значение: lastname
	});
});

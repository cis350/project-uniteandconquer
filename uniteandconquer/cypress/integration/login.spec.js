// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// successful login tested in registration.spec.js
describe('Tests user login failure', () => {
    it('Visits the app, registers with valid values, and logs in', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('button.submit').should('be.visible');
      cy.get('input.phone-field').type('3636363636').should('have.value', '3636363636');
      cy.get('input.field').type('Baby.321').should('have.value', 'Baby.321');
      cy.get('button.submit').click();
      cy.get('button.modalButton').should('be.visible');
      cy.get('button.modalButton').click();
    });
});
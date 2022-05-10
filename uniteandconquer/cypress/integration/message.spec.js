// message.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Tests user registration', () => {
    it('Visits the app, registers with valid values, and logs in, creates a post and sends a message', () => {
      cy.visit('http://localhost:3000/registration');
      cy.get('button').contains('Register').should('be.visible');
      cy.get('input.first-name-input').type('Agera').should('have.value', 'Agera');
      cy.get('input.last-name-input').type('Res').should('have.value', 'Res');
      cy.get('input.phone-input').type('0011001110').should('have.value', '0011001110');
      cy.get('input.email-input').type('agera@gmail.com').should('have.value', 'agera@gmail.com');
      cy.get('input.password-input').type('Baby.123').should('have.value', 'Baby.123');
      cy.get('input.confirm-password-input').type('Baby.123').should('have.value', 'Baby.123');
      cy.get('button').contains('Computers').should('be.visible');
      cy.get('button').contains('Computers').click();
      cy.get('button').contains('Register').click();
      cy.get('button.modalButton').should('be.visible');
      cy.get('button.modalButton').click();
      cy.get('input.phone-field').type('0011001110').should('have.value', '0011001110');
      cy.get('input.field').type('Baby.123').should('have.value', 'Baby.123');
      cy.get('button.submit').should('be.visible');
      cy.get('button.submit').click();
      cy.window().its('sessionStorage').invoke('getItem', 'firstName').should('equal', 'Agera');
      cy.get('.new-post-text').click();
      cy.get(':nth-child(1) > input').type('Tomatoes').should('have.value', 'Tomatoes');
      cy.get(':nth-child(2) > input').type('1').should('have.value', '1');
      cy.get(':nth-child(3) > input').type('5').should('have.value', '5');
      cy.get(':nth-child(4) > input').type('3').should('have.value', '3');
      cy.get(':nth-child(5) > input').type('link.com').should('have.value', 'link.com');
      cy.get('.desc').type('delicious tomatoes').should('have.value', 'delicious tomatoes');
      cy.get('#Appliances').click();
      cy.get('button.create').click();
    });
});
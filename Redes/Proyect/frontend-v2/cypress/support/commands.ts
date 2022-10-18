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
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
    }
  }
}

/* Functions */

const login = (username: string, password: string) => {
    cy.visit('/login')
    cy.get('input[name=username]').type(username)
    cy.get('input[name=password]').type(password)
    cy.get('button[type=submit]').click()

    cy.url().should('include', '/')
}

// Prevent TypeScript from reading file as legacy script
Cypress.Commands.add('login', login)


export {}
// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/Home')
    cy.url().should('include', '/Home')
    cy.contains('Altro addetto').click()
    cy.url().should('include', '/Home')
    cy.contains('Work in progress!')
  })
})

// https://docs.cypress.io/api/introduction/api.html

describe('Test the loding of other employee page', () => {
  it('Visit otheremployee page', () => {
    cy.visit('/Home')
    cy.url().should('include', '/Home')
    cy.contains('Altro addetto').click()
    cy.url().should('include', '/Home')
  })

  it('Check the content', () => {
    cy.contains('Work in progress!')
  })
})

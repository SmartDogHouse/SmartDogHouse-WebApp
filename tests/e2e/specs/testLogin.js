//Open login page test it and test log out button
describe('My First Test', () => {
  it('Visits the app root url', () => {
    expect(true).to.equal(true) 
    cy.visit('/Login')
    cy.url().should('include', '/Login')
    cy.get('[data-cy="user"]').type('bruno123')
    cy.get('[data-cy="password"]').type('passwordona')
    cy.contains('button','Login').click()
    cy.url().should('include', '/Home')
    cy.get('#openDrawner').click()
    cy.contains('Logout').click()
    cy.url().should('include', '/Login')
  })
})

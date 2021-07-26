const user = {
  "name": "bruno123",
  "passwd": "passwordona",
}

describe('Test login functionalities', () => {
  it('Loag the login page', () => {
    cy.visit('/Login')
    cy.url().should('include', '/Login')
  })

  it('Fills the login fields', () => {
    cy.get('[data-cy="user"]').type(user.name)
    cy.get('[data-cy="password"]').type(user.passwd)
  })

  it('Try to login', () => {
    cy.contains('button','Login').click()
    cy.url().should('include', '/Home')
  })

  it('Try to logout', () => {
    cy.get('#openDrawner').click()
    cy.contains('Logout').click()
    cy.url().should('include', '/Login')
  })
})

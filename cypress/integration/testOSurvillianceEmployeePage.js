
describe('Test the loding of survilliance employee page', () => {
  it('Loads the page', () => {
    cy.visit('/Home')
    cy.url().should('include', '/Home')
    cy.contains('Addetto alla videosorveglianza').click()
    cy.url().should('include', '/Home')
  })

  it('Show the enviroment stats', () => {
    cy.contains('Umidità')
    cy.contains('Temperatura')
  })

  it('Contains notifications', () => {
    cy.contains('Notifiche')
  })
})

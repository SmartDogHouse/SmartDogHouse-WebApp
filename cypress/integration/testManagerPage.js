var dogs = 0
const dog = {
  "name": "krazone",
  "ID": "c033333",
  "cage":"454"
}
describe('Test the loding and functionalities of food employee page', () => {
  it('Visit food page, and load dogs',{pathname:"*"}, () => {
    cy.intercept('**/Prod/view/dogs').as('loadDogs')
    cy.visit('/Home')
    cy.wait('@loadDogs').then((interception) => {
      dogs = interception.response.body.length
      expect(interception.response.statusCode).to.eq(200)
      console.log(interception)
    })
    cy.url().should('include', '/Home')
    cy.contains('Addetto cibo').click()
    cy.url().should('include', '/Home')
  })


  it('Contains notifications', () => {
    cy.contains('Notifiche')
  })

  it('Contains dogs components', () => {
    cy.contains('Dati cane')
    cy.contains('Cani registrati')
  })

  it('Display all the dogs loaded', () => {
    cy.get('[data-cy="dogScrollerItem"]').filter(':visible').should('have.length', dogs)
  })

  it('Test insert and removal of a dog', () => {
    cy.get('[data-cy="insertNewDog"]').filter(':visible').click()
    cy.get('[data-cy="dogName"]').filter(':visible').type(dog.name)
    cy.get('[data-cy="dogID"]').filter(':visible').type(dog.ID)
    cy.get('[data-cy="dogCage"]').filter(':visible').type(dog.cage)
    cy.intercept('**/Prod/set/new/dog').as('insertNewDog')
    cy.contains('Invia').click()
    cy.wait('@insertNewDog').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
    cy.intercept('**/Prod/set/dog/remove').as('removeDog')
    cy.get(`[data-cy=${dog.ID}]`).filter(':visible').click()
    cy.wait('@removeDog').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('Have the same number of dogs', () => {
    cy.get('[data-cy="dogScrollerItem"]').filter(':visible').should('have.length', dogs)
  })

})

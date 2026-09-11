import LoginPage from "../pages/LoginPage"

describe('Login tests', () => {
  beforeEach(function () {
    cy.fixture('validUserLogin').as('validUserLogin')
    LoginPage.visit()
  })
  it('Should retrieve error', () => {
    LoginPage
      .visit()
      .fillAllFields(this.validUserLogin)
      .clickLogin()
    cy.get('[data-test="login-error"]')
      .should('contain', 'Invalid')
    })
  })
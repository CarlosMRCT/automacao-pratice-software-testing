import LoginPage from "../pages/LoginPage"

describe('Login tests', () => {
  beforeEach(function () {
    cy.fixture('validUserLogin').as('validUserLogin')
    LoginPage.visit()
  })
  it('Failed login (Wrong password)', function () {
    const invalidUser = {
      ...this.validUserLogin,
      password:'1234'
    }
    LoginPage
      .fillAllFields(invalidUser)
      .clickLogin()
    cy.get('[data-test="login-error"]')
      .should('contain', 'Invalid')
    })

    it.only('Successful login', function () {
      const validUserLogin = {
        ...this.validUserLogin
      }
      LoginPage
       .fillAllFields(validUserLogin)
       .clickLogin()
      cy.url()
        .should('include', '/account')
    })
  })
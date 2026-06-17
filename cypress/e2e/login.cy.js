import LoginPage from "../pages/LoginPage"

describe('Login tests', () => {
  it('Should retrieve error', () => {
    LoginPage
      .visit()
      .fillEmail('usertest@test.com')
      .fillPassword('12345')
      .clickLogin()
     cy.get('[data-test="login-error"]')
      .should('contain', 'Invalid')
    })
  })
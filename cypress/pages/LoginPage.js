class LoginPage{
    Selector = {
        emailInput: '#email',
        passwordInput: '#password',
        submitButton: '[data-test="login-submit"]'
    }
    
    visit() {
        cy.visit('https://practicesoftwaretesting.com/auth/login')
        return this
  }

    fillEmail(email){
        cy.get(this.Selector.emailInput).type(email)
        return this
    }
    fillPassword(password) {
    cy.get(this.Selector.passwordInput).type(password)
    return this
  }

  clickLogin() {
    cy.get(this.Selector.submitButton).click()
    return this
  }
}

export default new LoginPage()
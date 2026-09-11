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

    fillEmail(userData){
      cy.get(this.Selector.emailInput).type(userData.email)
      return this
    }
    fillPassword(userData) {
    cy.get(this.Selector.passwordInput).type(userData.password)
    return this
  }

  clickLogin() {
    cy.get(this.Selector.submitButton).click()
    return this
  }
  fillAllFields(userData){
    this.fillEmail(userData)
      .fillPassword(userData)
    return this
  }
}

export default new LoginPage()
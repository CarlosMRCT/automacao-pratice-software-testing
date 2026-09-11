class RegisterPage{
    Selector={
        registerButton:'[data-test="register-link"]',
        firstNameInput:'[data-test="first-name"]',
        lastNameInput:'[data-test="last-name"]',
        birthDateInput:'[data-test="dob"]',
        countryList:'[data-test="country"]',
        postalCodeInput:'[data-test="postal_code"]',
        houseNumberInput:'[data-test="house_number"]',
        streetInput:'[data-test="street"]',
        cityInput:'[data-test="city"]',
        stateInput:'[data-test="state"]',
        phoneInput:'[data-test="phone"]',
        emailInput:'[data-test="email"]',
        passwordInput:'[data-test="password"]',
        buttonClick:'[data-test="register-submit"]'
    }
    visit() {
        cy.visit('https://practicesoftwaretesting.com/auth/register')
        return this
    }
    fillNames(userData){
        cy.get(this.Selector.firstNameInput).type(userData.firstName)
        cy.get(this.Selector.lastNameInput).type(userData.lastName)
        return this
    }
    fillBirthDate(userData){
        cy.get(this.Selector.birthDateInput).type(userData.birthDate)
        return this
    }
    fillCountry(userData){
        cy.get(this.Selector.countryList).select(userData.country)
        return this
    }
    fillAddress(userData){
        const address = userData.address
        cy.get(this.Selector.postalCodeInput).type(address.postalCode)
        cy.get(this.Selector.houseNumberInput).type(address.houseNumber)
        cy.get(this.Selector.streetInput).type(address.street)
        cy.get(this.Selector.cityInput).type(address.city)
        cy.get(this.Selector.stateInput).type(address.state)
        return this
    }
    fillContactInfo(userData){
        const contact = userData.contact
        cy.get(this.Selector.phoneInput).type(contact.phone)
        cy.get(this.Selector.emailInput).type(contact.email)
        return this
    }
    fillPassword(userData){
        cy.get(this.Selector.passwordInput).type(userData.password)
        return this
    }

    fillAllFields(userData) {
        this.fillNames(userData)
            .fillBirthDate(userData)
            .fillCountry(userData)
            .fillAddress(userData)
            .fillContactInfo(userData)
            .fillPassword(userData)
        return this
    }

    submit(){
        cy.get(this.Selector.buttonClick).click()
    }
}
export default new RegisterPage()
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
    fillNames(firstName, lastName){
        cy.get(this.Selector.firstNameInput).type(firstName)
        cy.get(this.Selector.lastNameInput).type(lastName)
        return this
    }
    fillBirthDate(birthDate){
        cy.get(this.Selector.birthDateInput).type(birthDate)
        return this
    }
    fillCountry(country){
        cy.get(this.Selector.countryList).select(country)
        return this
    }
    fillAddress(postalCode, houseNumber, street, city, state){
        cy.get(this.Selector.postalCodeInput).type(postalCode)
        cy.get(this.Selector.houseNumberInput).type(houseNumber)
        cy.get(this.Selector.streetInput).type(street)
        cy.get(this.Selector.cityInput).type(city)
        cy.get(this.Selector.stateInput).type(state)
        return this
    }
    fillContactInfo(phone, email){
        cy.get(this.Selector.phoneInput).type(phone)
        cy.get(this.Selector.emailInput).type(email)
        return this
    }
    fillPassword(password){
        cy.get(this.Selector.passwordInput).type(password)
        return this
    }
    submit(){
        cy.get(this.Selector.buttonClick).click()
    }
}
export default new RegisterPage()
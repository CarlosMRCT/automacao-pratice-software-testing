import RegisterPage from "../pages/RegisterPage"

describe('Register tests', () => {
    beforeEach(function (){
        cy.fixture('validUserRegister').as('validUserRegister')
        RegisterPage.visit()
    })
    it('Must fail register (Password with invalid characters)', function () {
        const userWithInvalidPassword = {
            ...this.validUserRegister,
            password: '123456789'
        }
        RegisterPage
            .fillAllFields(userWithInvalidPassword)
            .submit()
        cy.get('[data-test="password-error"]')
            .should('contain', 'invalid')
    })

    it('Failed register (Invalid Email Format)', function(){
        const userWithInvalidEmail = {
            ...this.validUserRegister,
            contact:{
                ...this.validUserRegister.contact,
                email:'emailteste.com'
            }
        }
        RegisterPage
            .fillAllFields(userWithInvalidEmail)
            .submit()
        cy.get('[data-test="email-error"]')
            .should('contain', 'invalid')
    })
});
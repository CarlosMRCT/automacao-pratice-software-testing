import RegisterPage from "../pages/RegisterPage"

describe('Register tests', () => {
    it('Must fail register (Password with invalid characters)', () => {
        RegisterPage
            .visit()
            .fillNames('Carlos Eduardo', 'Teste')
            .fillBirthDate('1990-01-01')
            .fillCountry('Brazil')
            .fillAddress('12345-678', '123', 'Rua Teste', 'São Paulo', 'SP')
            .fillContactInfo('11999999999', 'carlos.teste@example.com')
            .fillPassword('123456789')
            .submit()
        cy.get('[data-test="password-error"]')
            .should('contain', 'invalid')
    });
});
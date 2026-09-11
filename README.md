
---

## ⚙️ Configuração

### cypress.config.js

O arquivo de configuração desabilita algumas funcionalidades padrão para melhor controle:

```javascript
{
  allowCypressEnv: false,  // Desabilita variáveis de ambiente do Cypress
  e2e: {
    watchForFileChanges: false,  // Desabilita watch mode automático
  }
}
```

---

## 🚀 Como Executar

### Modo Interativo (Cypress Studio)
Abre a interface gráfica do Cypress para executar e debugar testes em tempo real:

```bash
npx cypress open
```

Selecione **E2E Testing** e escolha o navegador desejado.

### Modo Headless (CLI)
Executa todos os testes em background sem interface gráfica:

```bash
npx cypress run
```

### Executar arquivo de teste específico
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Executar com navegador específico
```bash
npx cypress run --browser chrome
```

---

## 🧪 Testes Implementados

### Login Tests (`login.cy.js`)

| Cenário | Validação |
|---|---|
| Falha no login (senha incorreta) | Mensagem de erro contém "Invalid" |
| Login com sucesso | Redirecionamento para `/account` |

### Register Tests (`register.cy.js`)

| Cenário | Validação |
|---|---|
| Falha no registro (senha em formato inválido) | Mensagem de erro contém "invalid" no campo de senha |
| Falha no registro (email em formato inválido) | Mensagem de erro contém "invalid" no campo de email |
| Falha no registro (campo obrigatório vazio) | Mensagem de erro contém "required" |
| Registro com sucesso | Redirecionamento para `/auth/login` |

**Exemplo de teste com fixture + override pontual:**

```javascript
beforeEach(function () {
    cy.fixture('validUserRegister').as('validUserRegister')
    RegisterPage.visit()
})

it('Failed register (Invalid Password Format)', function () {
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
```

O padrão de **spread operator** permite reaproveitar a massa de dados válida do fixture, sobrescrevendo apenas o campo relevante para cada cenário — sem duplicar JSON para cada variação de teste.

---

## 📄 Page Objects

### LoginPage.js

Encapsula todos os elementos e ações da página de login. Os métodos `fill*` recebem um objeto `userData` (não parâmetros posicionais), permitindo composição via `fillAllFields()`:

```javascript
class LoginPage {
  Selector = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '[data-test="login-submit"]'
  }

  visit() { /* navega para /auth/login */ }
  fillEmail(userData) { /* userData.email */ }
  fillPassword(userData) { /* userData.password */ }
  clickLogin() { /* clica no botão de login */ }
  fillAllFields(userData) { /* orquestra fillEmail + fillPassword */ }
}
```

**Benefícios:**
- Centraliza seletores em um único lugar
- Facilita manutenção quando seletores mudam
- Evita acoplamento por ordem de parâmetros posicionais
- Permite overrides pontuais via spread sem alterar a assinatura dos métodos

### RegisterPage.js

Implementa Page Object para fluxo de registro com múltiplos steps, agrupando campos relacionados (`address`, `contact`) dentro do objeto `userData`:

```javascript
class RegisterPage {
  Selector = { /* 13 elementos de formulário */ }

  visit() { /* navega para /auth/register */ }
  fillNames(userData) { /* userData.firstName, userData.lastName */ }
  fillBirthDate(userData) { /* userData.birthDate */ }
  fillCountry(userData) { /* userData.country */ }
  fillAddress(userData) { /* userData.address.{postalCode, houseNumber, street, city, state} */ }
  fillContactInfo(userData) { /* userData.contact.{phone, email} */ }
  fillPassword(userData) { /* userData.password */ }
  fillAllFields(userData) { /* orquestra todos os métodos acima */ }
  submit() { /* submete o formulário */ }
}
```

---

## 💡 Padrões e Boas Práticas

### Page Object Model (POM)
- Separa a lógica de testes da implementação de UI
- Facilita manutenção centralizada de seletores
- Permite reutilização de métodos em múltiplos testes

### Method Chaining
Todos os Page Objects retornam `this` para permitir encadeamento fluido:

```javascript
LoginPage
  .visit()
  .fillAllFields(userData)
  .clickLogin()
```

### Fixtures + Test Data Builder (Spread Override)
Massa de dados válida centralizada em fixtures (`validUserLogin.json`, `validUserRegister.json`). Cenários de erro reaproveitam o dado válido, sobrescrevendo apenas o campo sob teste:

```javascript
const userWithInvalidEmail = {
    ...this.validUserRegister,
    contact: {
        ...this.validUserRegister.contact,
        email: 'emailteste.com'
    }
}
```

### Seletores Data-Driven
Utiliza atributos `data-test` para garantir seletores mais estáveis:

```javascript
[data-test="login-submit"]  // Mais robusto que classes/IDs
```

---

## ⚙️ CI/CD

Pipeline configurado em `.github/workflows/cypress.yml`, executando `actions/checkout` seguido da action oficial `cypress-io/github-action`.

**Gatilho:** manual (`workflow_dispatch`), via aba *Actions* do GitHub — ver [Limitações Conhecidas](#️-limitações-conhecidas) para o motivo de não estar em `push`/`pull_request`.

---

## 🔧 Próximos Passos

- [x] Implementar fixtures com dados de teste
- [x] Configurar pipeline de CI/CD (GitHub Actions)
- [ ] Resolver bloqueio de IP no CI via self-host com Docker (`docker-compose` do projeto de origem)
- [ ] Migrar geração de massa de dados para `@faker-js/faker` (elimina dependência de e-mails fixos/únicos por timestamp)
- [ ] Adicionar testes de fluxo completo (register → login → logout)
- [ ] Criar comandos customizados reutilizáveis
- [ ] Adicionar testes para funcionalidades adicionais (busca, carrinho, checkout)

---

## 📚 Recursos e Referências

- [Documentação Cypress](https://docs.cypress.io/)
- [Page Object Model em Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Practice Software Testing](https://practicesoftwaretesting.com/)
- [Practice Software Testing - Repositório de origem (self-host)](https://github.com/testsmith-io/practice-software-testing)

---

## 👤 Autor

**Carlos Eduardo Marchonatto**

---

## 📝 Licença

ISC

---

## 📞 Suporte

Para dúvidas ou sugestões sobre automação de testes, sinta-se à vontade para abrir uma issue ou entre em contato.
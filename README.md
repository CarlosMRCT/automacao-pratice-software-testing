Automação de Testes - Practice Software Testing

Projeto de automação de testes utilizando Cypress para o site Practice Software Testing. Este projeto aplica conhecimentos de teste de software com foco em padrões como Page Object Model (POM) e boas práticas de automação.

📋 Sumário


Visão Geral
Tecnologias
Pré-requisitos
Instalação
Estrutura do Projeto
Configuração
Como Executar
Testes Implementados
Page Objects



🎯 Visão Geral

Este projeto implementa testes E2E (end-to-end) automatizados para validar funcionalidades críticas do site Practice Software Testing. O foco está em cobertura de fluxos de autenticação (login e registro) utilizando o padrão Page Object Model para melhor manutenibilidade e reutilização de código.


🛠 Tecnologias


Cypress (v15.17.0) - Framework de testes E2E
JavaScript (ES6+) - Linguagem de desenvolvimento
Node.js - Runtime JavaScript
CommonJS - Sistema de módulos



📦 Pré-requisitos


Node.js (versão 20.1.0 ou superior)
npm (gerenciador de pacotes)
Navegador Chrome ou Electron (inclusos com Cypress)



💾 Instalação


Clone ou baixe o repositório:


bash   git clone <url-do-repositorio>
   cd automacao-pratice-software-testing


Instale as dependências:


bash   npm install


📂 Estrutura do Projeto

automacao-pratice-software-testing/
│
├── cypress/
│   ├── e2e/                      # Arquivos de teste
│   │   ├── login.cy.js           # Testes de login
│   │   └── register.cy.js        # Testes de registro
│   │
│   ├── pages/                    # Page Objects (POM)
│   │   ├── LoginPage.js          # Objeto de página para login
│   │   └── RegisterPage.js       # Objeto de página para registro
│   │
│   ├── fixtures/                 # Dados de teste
│   │   └── example.json          # Exemplo de fixture
│   │
│   └── support/                  # Configurações e utilitários
│       ├── commands.js           # Comandos customizados
│       └── e2e.js                # Setup global para E2E
│
├── cypress.config.js             # Configuração do Cypress
├── package.json                  # Dependências do projeto
├── package-lock.json             # Lock de dependências
└── README.md                      # Este arquivo


⚙️ Configuração

cypress.config.js

O arquivo de configuração desabilita algumas funcionalidades padrão para melhor controle:

javascript{
  allowCypressEnv: false,  // Desabilita variáveis de ambiente do Cypress
  e2e: {
    watchForFileChanges: false,  // Desabilita watch mode automático
  }
}


🚀 Como Executar

Modo Interativo (Cypress Studio)

Abre a interface gráfica do Cypress para executar e debugar testes em tempo real:

bashnpx cypress open

Selecione E2E Testing e escolha o navegador desejado.

Modo Headless (CLI)

Executa todos os testes em background sem interface gráfica:

bashnpx cypress run

Executar arquivo de teste específico

bashnpx cypress run --spec "cypress/e2e/login.cy.js"

Executar com navegador específico

bashnpx cypress run --browser chrome


🧪 Testes Implementados

1. Login Tests (login.cy.js)

Teste: Validar mensagem de erro com credenciais inválidas


Descrição: Verifica se o sistema exibe mensagem de erro quando credenciais incorretas são fornecidas
Fluxo:

Navega até a página de login
Preenche email inválido: usertest@test.com
Preenche senha: 12345
Clica em "Login"
Valida que mensagem contém "Invalid"





javascriptit('Should retrieve error', () => {
  LoginPage
    .visit()
    .fillEmail('usertest@test.com')
    .fillPassword('12345')
    .clickLogin()
  cy.get('[data-test="login-error"]')
    .should('contain', 'Invalid')
})

2. Register Tests (register.cy.js)

Teste: Validar falha de registro com senha inválida


Descrição: Verifica se o sistema rejeita senhas com caracteres inválidos
Fluxo:

Navega até a página de registro
Preenche dados pessoais:

Nome: Carlos Eduardo
Sobrenome: Teste
Data de nascimento: 1990-01-01
País: Brazil



Preenche endereço:

CEP: 12345-678
Número: 123
Rua: Rua Teste
Cidade: São Paulo
Estado: SP



Preenche contato:

Telefone: 11999999999
Email: carlos.teste@example.com



Tenta registrar com senha 123456789
Valida mensagem de erro contém "invalid"





javascriptit('Must fail register (Password with invalid characters)', () => {
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
})


📄 Page Objects

LoginPage.js

Encapsula todos os elementos e ações da página de login:

javascriptclass LoginPage {
  Selector = {
    emailInput: '#email',
    passwordInput: '#password',
    submitButton: '[data-test="login-submit"]'
  }
  
  visit() { /* navega para /auth/login */ }
  fillEmail(email) { /* preenche campo de email */ }
  fillPassword(password) { /* preenche campo de senha */ }
  clickLogin() { /* clica botão de login */ }
}

Benefícios:


Centraliza seletores em um único lugar
Facilita manutenção quando seletores mudam
Promove reutilização de código
Melhora legibilidade dos testes


RegisterPage.js

Implementa Page Object para fluxo de registro com múltiplos steps:

javascriptclass RegisterPage {
  Selector = { /* 13 elementos de formulário */ }
  
  visit() { /* navega para /auth/register */ }
  fillNames(firstName, lastName) { /* nome e sobrenome */ }
  fillBirthDate(birthDate) { /* data de nascimento */ }
  fillCountry(country) { /* país */ }
  fillAddress(postalCode, houseNumber, street, city, state) { /* endereço */ }
  fillContactInfo(phone, email) { /* telefone e email */ }
  fillPassword(password) { /* senha */ }
  submit() { /* submete formulário */ }
}


💡 Padrões e Boas Práticas

Page Object Model (POM)


Separa a lógica de testes da implementação de UI
Facilita manutenção centralizada de seletores
Permite reutilização de métodos em múltiplos testes


Method Chaining

Todos os Page Objects retornam this para permitir encadeamento fluido:

javascriptLoginPage
  .visit()
  .fillEmail('teste@example.com')
  .fillPassword('senha123')
  .clickLogin()

Seletores Data-Driven

Utiliza atributos data-test para garantir seletores mais estáveis:

javascript[data-test="login-submit"]  // Mais robusto que classes/IDs


🔧 Próximos Passos


 Implementar fixtures com dados de teste
 Adicionar testes de fluxo completo (register → login → logout)
 Criar comandos customizados reutilizáveis
 Implementar relatórios de teste
 Adicionar testes para funcionalidades adicionais (busca, carrinho, checkout)
 Configurar CI/CD (GitHub Actions, Jenkins)



📚 Recursos e Referências


Documentação Cypress
Page Object Model em Cypress
Practice Software Testing



👤 Autor

Carlos Eduardo Marchonatto

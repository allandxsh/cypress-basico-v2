/// <reference types="Cypress" />
beforeEach(() => {
    cy.visit('/src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Allan')
        cy.get('#lastName').type('Carneiro')
        cy.get('#email').type('allanhmc9@gmail.com')
        cy.get('#open-text-area').type('Qualquer coisa')
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Allan')
        cy.get('#lastName').type('Carneiro')
        cy.get('#email').type('allanhmc9com')
        cy.get('#open-text-area').type('Qualquer coisa')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('validar que o campo telefone não aceita não-numericos', function(){
        cy.get('#phone').type('abcde').should('have.text', '')

    })
    it('exibe mensagem de error se marcar o telefone e não preencher o mesmo', function () {
        cy.get('#firstName').type('Allan')
        cy.get('#lastName').type('Carneiro')
        cy.get('#email').type('allanhmc9@gmail.com')
        cy.get('#open-text-area').type('Qualquer coisa')
        cy.get('#phone-checkbox').click()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('validar o valor dos campos antes e após limpar', function () {
        cy.get('#firstName').type('Allan').should('have.value', 'Allan').clear().should('have.value', '')
        cy.get('#lastName').type('Carneiro').should('have.value', 'Carneiro').clear().should('have.value', '')
        cy.get('#email').type('allanhmc9@gmail.com').should('have.value', 'allanhmc9@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('81998824423').should('have.value', '81998824423').clear().should('have.value', '')
    })
    it('validar que ao entrar no site e clicar em enviar sistema retorna erro', function () {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formulário com sucesso por meio de um script personalizado', function () {
        cy.fillMandatoryFieldsAndSubmit('Allan', 'Carneiro', 'allanhmc9@gmail.com', 'Qualquer')
    })
})

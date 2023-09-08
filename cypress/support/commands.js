Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email, openTextArea,) => {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(openTextArea)
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
})
describe("Create new Register", () => {
    before(() => {
        cy.visit("http://localhost:3000/");
        cy.login("super", "test");
    });
 
    it("should create a new register", () => {
        cy.get("button.bp4-button.new > span.bp4-button-text").click();
        cy.get('input[placeholder="Titulo*"]').type("Titulo de prueba");
        cy.get('input[placeholder="Expediente*"]').type("213456789");
        cy.get('input[placeholder="Folio*"]').type("123456");
        cy.get('input[placeholder="Fecha*"]').type("10/18/2022, 12:00:00 AM{enter}");
        cy.get('.select-area').click();
        cy.get('.area-item').first().click();
        cy.focused().type("{enter}");
        cy.get('.tag-select').eq(1).click();
        cy.get('.tag-item').first().click();
        cy.get('input[placeholder="Nombre"]').type("Metaprop");
        cy.get('input[placeholder="Valor"]').eq(1).type("Valor");
        cy.get('.upload-button').click();
        cy.get('.siguiente').click();


        cy.get('.upload-input').selectFile('cypress/fixtures/a.pdf', { force: true });
        cy.get('.subir').click();

        
    });
})

export {}
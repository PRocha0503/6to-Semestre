describe("Create Batch", () => {
    before(() => {
        cy.visit("http://localhost:3000/");
        cy.login("super", "test");
    });
 
    it("should create a new batch", () => {
        cy.get(".exel").click();
        cy.get(".upload-input").selectFile("cypress/fixtures/batch.xlsx", { force: true });
        cy.get(".siguiente").click();

        cy.get(".header-select").first().click({ force: true });
        cy.get(".header-select-item").first().click({ force: true });


        cy.get(".header-select").eq(1).click({ force: true });
        cy.get(".header-select-item").eq(4).click();


        cy.get(".header-select").eq(2).click({ force: true });
        cy.get(".header-select-item").eq(5).click();


        cy.get(".subir").click();

    });
})

export {}
describe("Query Documents", () => {
    before(() => {
        cy.visit("http://localhost:3000/");
        cy.login("super", "test");
    });
 
    it("should query documents", () => {
        cy.get('.header-item-select').click();
    });
})

export {}
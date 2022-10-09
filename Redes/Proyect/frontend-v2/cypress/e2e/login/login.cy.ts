describe("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.contains("Inicio de sesión")
    });
  
    it("fail login", () => {
        cy.get('[data-cy="username"]').type("nouser");
        cy.get('[data-cy="password"]').type("test");
        cy.get('[data-cy="login"]').click();

        cy.contains("Usuario o contraseña incorrectos");
    });


    it("should login and logout", () => {
        cy.get('[data-cy="username"]').type("super");
        cy.get('[data-cy="password"]').type("test");
        cy.get('[data-cy="login"]').click();

        cy.url().should('eq', 'http://localhost:3000/');

        cy.get('[data-cy="logout"]').click();

        cy.url().should('eq', 'http://localhost:3000/login');
    });
})

export {}
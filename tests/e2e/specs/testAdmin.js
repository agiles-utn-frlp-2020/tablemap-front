describe("Administrador", function() {
  it("Pruebo logearme como Administrador", function() {
    cy.visit("http://localhost:8080/login");
    cy.get("#user").type("admin");
    cy.get("#pass").type("admin");
    cy.get(".button").click();
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:8080/admin/activity");
  });
});

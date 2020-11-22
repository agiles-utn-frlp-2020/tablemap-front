describe("Mozo", function() {
  it("Pruebo logearme como Mozo", function() {
    cy.visit("http://localhost:8080/login");
    cy.get("#user").type("foo");
    cy.get("#pass").type("foo");
    cy.get(".button").click();
    cy.wait(2000);
    cy.get(":nth-child(1) > .flex > .text-2xl").contains("TableMap");
  });
});

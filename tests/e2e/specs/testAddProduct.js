describe("Product", function() {
  it("Pruebo agregar un producto", function() {
    cy.visit("http://localhost:8080/login");
    cy.get("#user").type("admin");
    cy.get("#pass").type("admin");
    cy.get(".button").click();
    cy.get('[href="/admin/product"] > .menu-item > svg').click();
    cy.get(".flex > .button").click();
    cy.get("#img").type(
      "https://www.diariolibre.com/binrepository/1000x667/0c0/0d0/none/10904/NASQ/shutterstock-643604302_14586422_20200818073951.jpg"
    );
    cy.get("#name").type("Piza");
    cy.get("#price").type("500");
    cy.get(".flex > .button--primary").click();
  });
});

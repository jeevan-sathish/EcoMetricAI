/* global describe, it, cy */

describe("filter car", () => {
  it("filter and get car based on user fields", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[name="brand"]').should("exist");
    cy.get('input[name="model"]').should("exist");
    cy.get('input[name="fueltype"]').should("exist");

    cy.get('input[name="brand"]').type("Audi");
    cy.get('input[name="model"]').type("A8L Tdi (Modified)");
    cy.get('input[name="fueltype"]').type("Diesel");

    cy.contains("search").click();

    cy.wait(1000);

    cy.get("ul").should("exist");
  });
});

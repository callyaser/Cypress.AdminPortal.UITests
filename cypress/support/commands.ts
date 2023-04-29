// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands.
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export {};
import './auth/programmatic-login';
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            navigateTo(pageName: string): Chainable<any>;
            waitUntilRenderComplete(): void;
            waitUntilDashboardLoads():Chainable<any>;
            navigateTo(pageName: string): void;
            programmaticLogin(): void;
            addUserID(): void;
            programmaticLoginWithCookies(): void;
            loginPOST(token?: string): Chainable<any>;
            translationsAPI(): Chainable<any>;
            enterText(a: string, b: string): Chainable<any>;
            waitUntilRenderComplete(): void
            generateRandomDateString(a: string): Chainable<string>;
        }
    }
}
Cypress.Commands.add('navigateTo', (pageName) => {
    cy.visit(`${pageName}`)
    //cy.waitUntilRenderComplete();
});
// Must be declared global to be detected by typescript (allows import/export)
Cypress.Commands.add('waitUntilRenderComplete', () => {
    cy.get('div[class*="k-i-loading"]').should('not.exist')
    cy.get('div[class*="k-loading-image"]').should('not.exist')
    cy.get("span[class='k-icon k-i-loading']").should('not.exist')
});
Cypress.Commands.add('enterText', function (textElement: string, textToType: string) {
    cy.get(textElement).clear().type(textToType);
    cy.wait(700)
    cy.waitUntilRenderComplete();
})
Cypress.Commands.add('waitUntilDashboardLoads', () => {
    cy.get('div.widget-loader').should('not.be.visible')
});
 
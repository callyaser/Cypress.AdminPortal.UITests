import { APIHeaders, affProgramUrl as testProgramUrl, targetUrl } from "../../fixtures/api-config"
Cypress.Commands.add('loginPOST', () => {
    cy.request({
        method: 'POST',
        url: `${testProgramUrl}`,
        body: {
            "userName":"testUsername","password":"testPassword"
        },
        failOnStatusCode: false,
        form: true
    }).then((response) => {
        console.log(response);
        console.log(response.body);
      })
});
Cypress.Commands.add('translationsAPI', () => {
    cy.clearCookies();
    cy.request({
        method: 'GET',
        url: `${testProgramUrl}`,
        failOnStatusCode: false
    });
    cy.setCookie('aflang', '1');
    cy.setCookie('ASPSESSIONIDQUCBABBQ', 'EKANNGDBIFHDBNDOCGPNKLOK');
    cy.setCookie('ASPSESSIONIDAUDDCCCT', 'PNINPJDBIBCFFBEHJHDDKGND');
});
Cypress.Commands.add('programmaticLogin', () => {
    // API call to login API with username and password
    cy.translationsAPI()
        .then((resp) => {
              cy.loginPOST();
        });          
});
 
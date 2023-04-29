import { SecurityRolesPage } from "../fixtures/pageObjects/security-roles-page";
import { SecurityRolesCreatePage } from "../fixtures/pageObjects/security-roles-create";
describe('Security Roles', () => {
    const securityRolesPage = new SecurityRolesPage();
    const securityRolesCreatePage = new SecurityRolesCreatePage();
    beforeEach(() => {
        cy.programmaticLogin();
        cy.navigateTo(`${"testUrl"}/settings/security-roles`);
    });
    it('SecurityRoles grid contains expected column headers, records and roleID is a hyperlink', function () {
        //if grid contains less than 10 security roles, this assertion is skipped
        securityRolesPage.getTotalRecordsCountOnGrid().then((recordsCount) => {
            if (parseInt(recordsCount) > 10)
                cy.get(securityRolesPage.roleRow).should('have.length', 10)
        })
        //Assert that there are 6 data columns. have.length is 8 because there are 2 additional columns for - checkbox, edit icon
        cy.get(securityRolesPage.roleRow).first().find('td').should('have.length', 8)
        //Assert that roleID in the grid is a hyperlink and redirects to details page
        cy.get(securityRolesPage.roleRow).eq(2).find('td').eq(2)
            .within(function () {
                cy.get('div').eq(1).click().then(id => {
                    let roleID = id.text();
                    cy.url().should('include', `/security-roles/${roleID}/details`)
                })
            })
    })
    it('should go to step 1 page', function () {
        cy.get('button:contains("New")').click();
        cy.url().should('include', 'settings/security-roles/create');
    });
    it('should be able to toggle an active role to inactive', function () {
        securityRolesPage.checkRandomRoleAndChangeStatusToInactive().then(roleID => {
            securityRolesPage.toInactiveTab();
            securityRolesPage.filterByID(roleID);
            cy.get(`a[href='/ia-merchant/settings/security-roles/${roleID}/details']`).should('exist');
        })
    })
    it('should be able to toggle an inactive role to active', function () {
        securityRolesPage.checkRandomRoleAndChangeStatusToActive().then(roleID => {
            securityRolesPage.toActiveTab();
            securityRolesPage.filterByID(roleID);
            cy.get(`a[href='/ia-merchant/settings/security-roles/${roleID}/details']`).should('exist');
        })
    })
    it('should be able to multiselect inactive roles and change status to active in bulk', function () {
        securityRolesPage.toInactiveTab().checkMultipleRoles().then((rolesArray) => {
            securityRolesPage.changeStatusToActive().toActiveTab();
            rolesArray.forEach(role => {
                securityRolesPage.filterByID(role);
                cy.get(`a[href='/ia-merchant/settings/security-roles/${role}/details']`).should('exist');
            })
        })
    })
    it('should be able to multiselect active roles and change status to inactive in bulk', function () {
        securityRolesPage.checkMultipleRoles().then((rolesArray) => {
            securityRolesPage.changeStatusToInactive().toInactiveTab();
            rolesArray.forEach(role => {
                securityRolesPage.filterByID(role);
                cy.get(`a[href='/ia-merchant/settings/security-roles/${role}/details']`).should('exist');
            })
        })
    })
    it('should be able to select any existing role, edit name and description', function () {
        securityRolesPage.checkRandomRole().then((roleId) => {
            cy.contains(roleId).click({ force: true });
            securityRolesPage.editRoleButton();
            var newRoleName = cy.generateRandomDateString('testRole');
            cy.generateRandomDateString('testrole').then(randomRolename => {
                cy.get(securityRolesCreatePage.roleNameTxtbox).type(randomRolename);
                var roleDesc = `Edited Description ${randomRolename}`;
                cy.get(securityRolesCreatePage.roleDescTxtbox).clear();
                cy.get(securityRolesCreatePage.roleDescTxtbox).type(roleDesc);
            })
            securityRolesCreatePage.setRoleStatus("Inactive");
            cy.get(securityRolesPage.continueBtn).click({ force: true });
            cy.url().should('contain', '/details');
        })
    })
    it('Edit Security Role and add Users', function () {
        securityRolesPage.checkRandomRole().then((roleId) => {
            cy.contains(roleId).click({ force: true });
            securityRolesPage.editRoleButton();
            cy.get(securityRolesPage.addUsersBtn).click();
            cy.wait(1000);
            securityRolesPage.checkRandomUser();
            cy.get(securityRolesPage.continueBtnInAddUsers).eq(1).click({ force: true });
            cy.url().should('contain', '/details');
        })
    })
    it('Edit Security Role and set all affiliate data to NO, select specific fields and save', function () {
        var roleDetailsPage = securityRolesPage.editRandomRole().selectAllAffiliateData(false).clickSave()
        cy.url().should('contain', '/details')
        roleDetailsPage.toSecurityRolesGrid()
        securityRolesPage.editRandomRole().selectAllAffiliateData(true).clickSave()
        cy.url().should('contain', '/details')
    })
})
 
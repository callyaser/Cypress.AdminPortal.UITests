import { SecurityRolesDetailsPage } from "./security-roles-details";
import { Webpage } from "./Webpage";
export class SecurityRolesPage extends Webpage {
    private changeStatusBtn: string = 'Change Status';
    private activeOption: string = '.k-state-focused > .ng-star-inserted';
    private inactiveOption: string = '[ng-reflect-index="1"] > .ng-star-inserted';
    private activeTab: string = '#k-tabstrip-tab-0 > .k-link';
    private inactiveTab: string = '#k-tabstrip-tab-1 > .k-link';
    private roleCheckbox: string = '[data-testing="gridRowCheckboxInput"]';
    private idColFilter: string = '[data-testing="security-roles-grid_filter_id"]>input';
    private nameColFilter: string = '[data-testing="security-roles-grid_filter_name"]>input';
    private descriptionColFilter: string = '[data-testing="security-roles-grid_filter_description"]>input';
    private rolesGrid: string = '[data-grid-name="security-roles-grid"]';
    public roleRow: string = 'tbody tr';
    private paginationInfo = 'kendo-pager-info';
    private editRole: string = '.k-icon.k-i-edit';
    public continueBtn = '.modal-confirm.k-button.ng-star-inserted';
    public addUsersBtn = '.default-button';
    public usersCheckbox: string = '[data-testing="gridRowCheckboxInput"]';
    public continueBtnInAddUsers = '.ps-ia-btn';
    private securityRolesEndpoint = '**/SecurityRoles?*'
    private affiliateGroupsEndpoint = '**/AffiliateGroups?*'
    checkRandomRole() {
        var elt = cy.get(this.roleCheckbox)
            .eq(2)
            .click()
            .invoke('attr', 'id').then(value => {
                const roleId = value.substring(value.indexOf('_') + 1);
                cy.wrap(roleId).as('roleId');
                cy.log(value);
            })
        return cy.get<string>('@roleId');
    }
    checkMultipleRoles() {
        var rolesArray = [];
        for (let i = 1; i < 4; i++) {
            cy.get(this.roleCheckbox)
                .eq(i)
                .click().invoke('attr', 'id').then((value) => {
                    const roleId = value.substring(value.indexOf('_') + 1);
                    rolesArray.push(roleId);
                })
        }
        cy.wrap(rolesArray).as('roles')
        return cy.get<string[]>('@roles');
    }
    toInactiveTab() {
        cy.get(this.inactiveTab).click();
        cy.waitUntilRenderComplete();
        return this
    }
    toActiveTab() {
        cy.get(this.activeTab).click();
        cy.waitUntilRenderComplete();
        return this
    }
    checkRandomRoleAndChangeStatusToInactive() {
        this.checkRandomRole().then(() => {
            this.changeStatusToInactive()
        })
        return cy.get<string>('@roleId');
    }
    checkRandomRoleAndChangeStatusToActive() {
        this.toInactiveTab()
        this.checkRandomRole().then(() => {
            this.changeStatusToActive()
        })
        return cy.get<string>('@roleId');
    }
    filterByID(id: string) {
        cy.intercept(this.securityRolesEndpoint).as('getSecurityRole')
        cy.enterText(this.idColFilter, id)
        cy.wait('@getSecurityRole')
    }
    filterByName(name: string) {
        cy.intercept(this.securityRolesEndpoint).as('getSecurityRole')
        cy.enterText(this.nameColFilter, name)
        cy.wait('@getSecurityRole')
    }
    filterByDescription(desc: string) {
        cy.intercept(this.securityRolesEndpoint).as('getSecurityRole')
        cy.enterText(this.descriptionColFilter, desc)
        cy.wait('@getSecurityRole')
    }
    getTotalRecordsCountOnGrid() {
        cy.get(this.paginationInfo).then((val) => {
            const paginationString = val.text();
            const totalRecords = paginationString.substring(paginationString.indexOf('of') + 2, paginationString.indexOf('items')).trim();
            cy.wrap(totalRecords).as('totalRecords');
        })
        return cy.get<string>('@totalRecords');
    }
    changeStatusToInactive() {
        cy.contains(this.changeStatusBtn).click()
        cy.get(this.inactiveOption).click()
        return this
    }
    changeStatusToActive() {
        cy.contains(this.changeStatusBtn).click()
        cy.get(this.activeOption).click()
        return this
    }
    landInPage() {
        cy.navigateTo(`${"testurl"}/settings/security-roles`);
        return this
    }
    editRoleButton() {
        cy.get(this.editRole).should('be.visible');
        cy.get(this.editRole).click();
    }
    checkRandomUser() {
        var elt = cy.get(this.usersCheckbox, { timeout: 10000 })
            .eq(2)
            .click()
            .invoke('attr', 'id').then(value => {
                const userId = value.substring(value.indexOf('_') + 1);
                cy.wrap(userId).as('userId');
                cy.log(value);
            })
        return cy.get<string>('@userId');
    }
    //click edit on the 3rd row/element displayed in the kendo grid
    editRandomRole() {
        cy.intercept(this.affiliateGroupsEndpoint).as('testGetGroups')
        cy.get('[data-kendo-grid-item-index="2"]>td:nth-child(2)').click()
        //its set to 8000ms as the GET call to /affiliateGroups takes 7s on average to receive status 200
        cy.wait('@getAffiliateGroups', { responseTimeout: 8000 })
        return new SecurityRolesDetailsPage();
    }
}
 
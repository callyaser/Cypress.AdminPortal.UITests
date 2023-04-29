import { SecurityRolesPage } from "./security-roles-page";
import { Webpage } from "./Webpage";
export class SecurityRolesDetailsPage extends Webpage {
    public roleNameTxtbox: string = 'input#roleName';
    public roleDescTxtbox: string = 'input#description';
    private status: string = 'input[role="combobox"]'
    public saveBtn = 'div[class="flex flex-row justify-end mt-8"]>button:nth-child(2)';
    public toastMessageDiv = 'lib-button-notification';
    public addUsersBtn_toastPopup = ".ng-star-inserted > .ps-ia-btn"
    public addUsersBtn = 'button.default-button'
    public statusBadge = 'div[class="badge disabled"]';
    public backToRolesHyperlink = "a[class='ps-ia-btn ps-ia-btn-back']"
    public merchantsList = 'span.flex-1.ng-star-inserted';
    public moduleCheckbox: string = '[data-testing="gridRowCheckboxInput"]';
    public editRoleIcon = 'i[class="k-icon k-i-edit"]'
    public affiliateDataSection = '[ng-reflect-title="Affiliate data"]';
    checkMultipleMerchants() {
        var merchantListArray = [];
        cy.get(this.moduleCheckbox, { timeout: 10000 }).eq(0).should('be.visible');
        for (let i = 1; i < 3; i++) {
            cy.get(this.moduleCheckbox)
                .eq(i)
                .click().invoke('attr', 'id').then((value) => {
                    const merchantsListId = value.substring(value.indexOf('_') + 1);
                    merchantListArray.push(merchantsListId);
                })
        }
        cy.wrap(merchantListArray).as('merchantList')
        return cy.get<string[]>('@merchantList');
    }
    setRoleStatus(option: string) {
        cy.get(this.status).click().clear().type(option).type("{enter}")
        return this
    }
    clickSave() {
        cy.get(this.saveBtn).click();
        cy.waitUntilRenderComplete();
        return this
    }
    clickAddUsersInToastMsg() {
        cy.get(this.saveBtn).click();
        cy.waitUntilRenderComplete();
    }
    toSecurityRolesGrid() {
        cy.get(this.backToRolesHyperlink).click()
        cy.url().should('contain', 'settings/security-roles')
        return new SecurityRolesPage();
    }
    checkRandomModule() {
        var elt = cy.get(this.moduleCheckbox)
            .eq(2)
            .click()
            .invoke('attr', 'id').then(value => {
                const moduleId = value.substring(value.indexOf('_') + 1);
                cy.wrap(moduleId).as('moduleId');
                cy.log(value);
            })
        return cy.get<string>('@moduleId');
    }
    selectAllAffiliateData(flag: boolean) {
        cy.get('kendo-expansionpanel:nth-child(3)').then($elt => {
            var len = $elt.find('kendo-expansionpanel').length;
            switch (flag) {
                case true: {
                    if (len > 0)
                        cy.get('[ng-reflect-name="isAllAffiliateVisibleData"] .ps-ia-toggle-switch').click()
                    break;
                }
                case false: {
                    if (len < 1) {
                        cy.get('[ng-reflect-name="isAllAffiliateVisibleData"] .ps-ia-toggle-switch').click()
                        cy.get('[ng-reflect-title="Personal Details"]').click()
                        cy.get('[ng-reflect-label="Web site url"] .ps-ia-toggle-switch').click()
                        cy.get('[ng-reflect-label="First Name"] .ps-ia-toggle-switch').click()
                        cy.get('[ng-reflect-title="Contact Information"]').click()
                        cy.get('[ng-reflect-label="Country"] .ps-ia-toggle-switch').click();
                    }
                    break;
                }
            }
        })
        return this
    }
}
 
import { debug } from "console";
import { affProgramUrl as testProgramUrl, targetEnvironment } from "../../../fixtures/api-config";
import { AccountReportPage } from "../../../fixtures/pageObjects/ReportsAnsStatistics/player-stats/account-report-page";
var config = require('../../../config.json')
describe('Account Report Tests', () => {
    const page = new AccountReportPage();
    beforeEach(() => {
        cy.log(this)
        cy.programmaticLogin();
        cy.navigateTo(`${testProgramUrl}welcome.asp`)
    });
    it('Should be able to land in the account report page after logging in as admin', function () {
        cy.xpath(page.reportsAndStatisticsLink).click();
        cy.xpath(page.playerStatsLink).click();
        cy.xpath(page.accountsReportLink).click();
        cy.url().should('contain', 'accounts_report.asp')
    })
    it('Should be able to generate detailed and simple version of account report and compare report columns count', function () {
        cy.navigateTo(`${testProgramUrl}merchant/accounts_report.asp`);
        //cy.waitUntilRenderComplete();
        cy.get(page.kendostartdatetextbox).eq(0).type('{selectAll}').type(config.reportStartDate)
        cy.get(page.merchant_dropdown).type('{selectAll}').type("all").type('{enter}')
        cy.get(page.generateReport_btn).click().waitUntilRenderComplete();
        cy.get('th[role="columnheader"]').then(elts => {
            var simpleCOlsLength = elts.length
            cy.get(page.reportLevel_detailed).click()
            cy.get(page.generateReport_btn).click().waitUntilRenderComplete();
            cy.get('th[role="columnheader"]').then(eltsDetailed => {
                var detailedColsCount = eltsDetailed.length;
                expect(detailedColsCount).to.be.greaterThan(simpleCOlsLength);
            })
        })
    })
    it('Should not throw an error when there is no results', function () {
        cy.navigateTo(`${testProgramUrl}merchant/accounts_report.asp`);
        //cy.waitUntilRenderComplete();
        cy.get(page.kendostartdatetextbox).eq(0).type('{selectAll}').type(config.reportStartDateFuture)
        cy.get(page.merchant_dropdown).type('{selectAll}').type("all").type('{enter}')
        cy.get(page.generateReport_btn).click().waitUntilRenderComplete();
        cy.get('div.grid-no-data h4').contains("No records available")
    })
    it.only('Apply a form filter on affiliateID field and validate report return results', function () {
        cy.navigateTo(`${testProgramUrl}merchant/accounts_report.asp`).waitUntilRenderComplete();
        //cy.waitUntilRenderComplete();
        cy.get(page.kendostartdatetextbox).eq(0).type('{selectAll}').type(config.reportStartDate)
        cy.get(page.merchant_dropdown).type('{selectAll}').type("all").type('{enter}')
        cy.get(page.generateReport_btn).click().waitUntilRenderComplete();
        cy.xpath('//span[@class="k-link"][contains(text(),"Total Commission")]').click();
        cy.get("td[data-kendo-grid-column-index='2'] a").eq(0).then((elt) => {
            var val = elt.text()
            cy.get("input#MemberId").type('{selectAll}').type(val)
            cy.get(page.generateReport_btn).click().waitUntilRenderComplete()
            cy.get('div.grid-no-data h4').should('not.exist');
        })
    })
    it.skip('Apply a > filter on TotalCommission column and validate report results are filtered and sorted as expected', function () {
        cy.navigateTo(`${testProgramUrl}merchant/accounts_report.asp`);
        //cy.waitUntilRenderComplete();
        cy.get(page.kendostartdatetextbox).eq(0).type('{selectAll}').type(config.reportStartDate)
        cy.get(page.merchant_dropdown).type('{selectAll}').type("all").type('{enter}')
        var comms: number[] = [];
        var filterValue: number = 50;
        cy.get("#FilterFieldName input").type("Total").type('{enter}')
        cy.get("input#FilterFieldValue").type(filterValue.toString())
        cy.get(page.generateReport_btn).click().waitUntilRenderComplete()
        cy.get('th[aria-colindex="33"]').click().waitUntilRenderComplete()
        cy.get("td[aria-colindex='33'] a").each((elt) => {
            var val = Number(elt.text().replace(/[^0-9.-]+/g, ""));
            comms.push(val)
        }).then(() => {
            expect(comms.every(comm => comm > filterValue)).to.be.true;
            var sorted: boolean = false;
            comms.forEach((value, index) => {
                if (comms[index + 1] >= comms[index] && index < comms.length - 1) {
                    sorted = true;
                }
                else {
                    throw new Error("**Sorting error - Records not sorted by ascending!!**")
                }
            })
        })
    })
    it('Validate that sorting the report results by total commission column works as expected', function () {
        cy.navigateTo(`${testProgramUrl}merchant/accounts_report.asp`);
        //cy.waitUntilRenderComplete();
        cy.get(page.kendostartdatetextbox).eq(0).type('{selectAll}').type(config.reportStartDateAs2020)
        cy.get(page.merchant_dropdown).type('{selectAll}').type("all").type('{enter}')
        cy.get(page.generateReport_btn).click().waitUntilRenderComplete();
        cy.get('select[aria-label="items per page"]').select("50").waitUntilRenderComplete();
        //Click on the TotalCommission column header to sort it by ascending
        var commColHeader = ''
        var commValue = ''
        if (targetEnvironment === "qadanskespil") {
            commColHeader = "th[aria-colindex='28']"
            commValue = "td[aria-colindex='28'] a"
        }
        else {
            commColHeader = 'th[aria-colindex="33"]'
            commValue = "td[aria-colindex='33'] a"
        }
        cy.get(commColHeader).click().waitUntilRenderComplete()
        var comms: number[] = [];
        cy.get(commValue).each((elt) => {
            var val = Number(elt.text().replace(/[^0-9.-]+/g, ""));
            comms.push(val)
        }).then(() => {
            var sorted: boolean = false;
            comms.forEach((value, index) => {
                if (comms[index + 1] >= comms[index] && index < comms.length - 1) {
                    sorted = true;
                }
                else {
                    if (index < comms.length - 1)
                        throw new Error("**Sorting error - Records not sorted by ascending!!**")
                }
            })
            cy.log(comms.toString())
            expect(sorted).to.be.true;
        })
    })
    it('Should be able to sort results by descending', function () {
        cy.navigateTo(`${testProgramUrl}merchant/accounts_report.asp`);
        //cy.waitUntilRenderComplete();
        cy.get(page.kendostartdatetextbox).eq(0).type('{selectAll}').type(config.reportStartDateAs2020)
        cy.get(page.merchant_dropdown).type('{selectAll}').type("all").type('{enter}')
        cy.get(page.generateReport_btn).click().waitUntilRenderComplete();
        cy.get('select[aria-label="items per page"]').select("50").waitUntilRenderComplete();
        //Click on the TotalCommission column header to sort it by ascending
        var commColHeader = ''
        var commValue = ''
        if (targetEnvironment === "qadanskespil") {
            commColHeader = "th[aria-colindex='28']"
            commValue = "td[aria-colindex='28'] a"
        }
        else {
            commColHeader = 'th[aria-colindex="33"]'
            commValue = "td[aria-colindex='33'] a"
        }
        cy.get(commColHeader).click().waitUntilRenderComplete()
        cy.get(commColHeader).click().waitUntilRenderComplete()
        var comms: number[] = [];
        cy.get(commValue).each((elt) => {
            var val = Number(elt.text().replace(/[^0-9.-]+/g, ""));
            comms.push(val)
        }).then(() => {
            var sorted: boolean = false;
            comms.forEach((value, index) => {
                if (comms[index + 1] <= comms[index] && index < comms.length - 1) {
                    sorted = true;
                }
                else {
                    if (index < comms.length - 1)
                        throw new Error("**Sorting error - Records not sorted by descending!!**")
                }
            })
            cy.log(comms.toString())
            expect(sorted).to.be.true;
        })
    })
})
 
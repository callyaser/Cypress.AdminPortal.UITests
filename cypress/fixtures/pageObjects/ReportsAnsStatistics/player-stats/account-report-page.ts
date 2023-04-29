import { ReportPage } from "../../ReportPage";
export class AccountReportPage extends ReportPage{
    public grid_siteid = '//kendo-grid-list[@class="k-grid-container"]//tr[1]//td[4]';
    public affSites_textbox = '//input[@id="siteid"]';
    public bannerId_textbox = '//input[@id="BannerId"]';
    public memberId_textbox = '//input[@id="MemberId"]';
    public reportsAndStatisticsLink = "//span[contains(text(),'Reports And Statistics')]"
    public playerStatsLink = "//span[contains(text(),'Player Stats')]"
    public accountsReportLink = "//a[@href='/admin/merchant/accounts_report.asp']";
}
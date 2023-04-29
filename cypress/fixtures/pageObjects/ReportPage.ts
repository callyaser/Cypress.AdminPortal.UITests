export class ReportPage{
    public affSites_textbox = '//input[@id="siteid"]';
    public bannerId_textbox = '//input[@id="BannerId"]';
    public memberId_textbox = '//input[@id="MemberId"]';
    public merchant_txtbox = '//kendo-combobox[@id="MerchantId"]//input[@class="k-input"]';
    public date_groupby = '//label[contains(text(),"Date")]';
    public period_elm = '//span[@class="k-link"][contains(text(),"Period")]';
    public month_groupby = '//label[contains(text(),"Month")]';
    public month_elm = '//span[@class="k-link"][contains(text(),"Period")]';
    public merchant_groupby = '//label[contains(text(),"Merchant")]';
    public merch_elm = '//span[@class="k-link"][contains(text(),"Merchant")]';
    public trackingprofile_groupby = '//label[contains(text(),"Tracking profile")]';
    public site_elm = '//span[@class="k-link"][contains(text(),"Site")]';
    public banner_groupby = '//label[contains(text(),"Banner")]';
    public creative_elm = '//span[@class="k-link"][contains(text(),"Creative")]';
    public kendostartdatetextbox = 'span[class="k-dateinput-wrap"] input';
    public grid_bannerid = '//kendo-grid-list[@class="k-grid-container"]//tr[1]//td[4]';
    public total_commInGrid = '//kendo-grid-list[@class="k-grid-container"]//a[contains(text(),".0")]';
    public grid_affid = '//tr[1]//td[1]//ia-grid-cell-hyperlink[1]';
    public merchant_dropdown = 'kendo-combobox#MerchantId kendo-searchbar';
    public startdate_dropdown = '#startdate';
    public btn_save = '//input[@class="BtnSave"]';
    public includeaff_detailswitch = '//kendo-switch[@id="IncludeAffiliateDetails"]';
    public reportLevel_detailed = '#ReportDetailLevel';
    public generateReport_btn = "button[type='submit']";
}
 
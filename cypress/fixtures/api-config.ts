export const WLDomain = '.test.net';
export const testDevDomain = '.test.domain';
export const path = '/admin/';
export const protocol = 'http://';
export const protocolPub = 'https://';
//targetEnvironment can be "qadanskespil", "wldevelopment"
export const targetEnvironment: string = "qatest";
export let testTenantName = '';
export let affProgramUrl = '';
export let targetUrl = () => {
    switch (targetEnvironment) {
         case "qatest":
            testTenantName = 'qatest';
            affProgramUrl = `https://${testTenantName + WLDomain + path}`;
            return `https://${testTenantName + WLDomain + path}`;
            break;
         case "qadev":
                testTenantName = 'qadev';
                affProgramUrl = `https://${testTenantName + testDevDomain + path}`;
                return `https://${testTenantName + testDevDomain + path}`;
                break;
        default:
            return ""
    }
}
export let testUrl = targetUrl();
export const APIHeaders = targetEnvironment === "qatest" ? {
    'Access-Control-Allow-Origin': "*",
    'x-forwarded-host': 'https://testsite.net/admin/',
    'Host': 'localhost:4200',
    'Origin': 'http://localhost:4200',
    'Referer': 'https://testsite.net/admin/'
} : {
    'Accept':`*/*`,
    'Accept-Encoding':`gzip, deflate, br`,
    'Client-Name':'test_portal',
    'Access-Control-Allow-Origin': "*",
    'x-forwarded-host': testUrl,
    'Host': `${testTenantName + testDevDomain}`,
    'Origin': `https://${testTenantName + testDevDomain}`,
    'Referer': `https://${testUrl}`
}
 
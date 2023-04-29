describe('Login page tests', () => {
    beforeEach(() => {
        cy.navigateTo('https://testQAUrl/admin');
    });
    it('should be able to reset password from admin login page', function () {
        cy.url().should('contain', 'admin')
    })
    it.only('Fetch data from SQL DB using mssql', function () {
        cy.task('DB', 'select top 1 * from test_table').then(res => {
            //cy.log(pkid)
        })
    })
})
 
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const sql = require('mssql')
//const Config = require("./cypress.json")
const sqlConfig = {
    user: 'web_cypressuser',
    password: 'testpassword',
    database: 'testDB',
    server: 'test-sql-server',
    options: {
        encrypt: false
    }
}
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    on('task',
        {
            DB: async (query: string) => {
                try {
                    await sql.connect(sqlConfig)
                    const result = await sql.query(query)
                    console.log(result.recordset[0].pkid)
                    return result
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    );
}
 
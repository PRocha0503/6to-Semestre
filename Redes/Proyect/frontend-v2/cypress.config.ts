const { defineConfig } = require('cypress')
// const http = require("./helpers/http");

module.exports = defineConfig({
    pageLoadTimeout: 10000,
    requestTimeout: 5000,
    responseTimeout: 5000,
    downloadsFolder: 'cypress/downloads',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    viewportHeight: 660,
    viewportWidth: 1000,
    waitForAnimations: true,
  e2e: {
    setUpNodeEvents(on, config) {
        // on('task', {
            // async 'db:seed'() {
            //   // Send request to backend API to re-seed database with test data
            //   const { data } = await http.post(`${process.env.BASE_URL}/db/seed`) // TODO: endpoint only available in dev mode
            //   return data
            // },
            //...
          // })
    },
    baseUrl: 'http://localhost:3000',
    
    // clientCertificates: [
    //     {
    //         url: 'https://localhost:3000',
    //         ca: '../nginx/certs/server.crt',
    //         certs: [
    //             {
    //                 cert: '../nginx/certs/client.crt',
    //                 key: '../nginx/certs/client.key',
    //             },
    //         ],
    //     }
    // ]
  }
})
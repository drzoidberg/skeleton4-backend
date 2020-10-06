const express = require('express');

const config = require('../config/config');
const loaders = require('./loaders')

startServer = () => {

    /* loads the loaders */
    const app = express();
    loaders(app);

    /* launches the server */
    app.listen(config.projectPort, (error) => {
        if (error) {
            console.log(`Server error. Trying to listen to port ${config.projectPort}: ${error}`);
        }
        console.info(`Server started on port ${config.projectPort}`);
    });
}

startServer();
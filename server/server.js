const mongoose = require('mongoose');

const config = require('../config/config');
const app = require('./express');

/* configuring db connection */
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

/* handling db connection error */
mongoose.connection.on('error', () => {
    throw new Error(`Server error. Unable to connect to database: ${config.mongoUri}`);
});

/* launching the server */
app.listen(config.projectPort, (error) => {
    if (error) {
        console.log(`Server error. Trying to listen to port ${config.projectPort}: ${error}`);
    }
    console.info(`Server started on port ${config.projectPort}`);
});

// require('dotenv').config({ path: '../.env' });

const config = {
    env: process.env.NODE_ENV || 'development',
    googleClient: process.env.GOOGLE_CLIENT || 'fill_the_dotenv_field',
    jwtAccountActivation: process.env.JWT_ACCOUNT_ACTIVATION || 'fill_the_dotenv_field',
    jwtResetPassword: process.env.JWT_RESET_PASSWORD || 'fill_the_dotenv_field',
    jwtSecret: process.env.JWT_SECRET || 'fill_the_dotenv_field',
    port: process.env.PROJECT_PORT || 3000,
    projectTitle: process.env.PROJECT_NAME || 'MERN-skeleton2',
    sendgridApiKey: process.env.SENDGRID_API_KEY || 'fill_the_dotenv_field',
    sendgridEmailFrom: process.env.SENDGRID_EMAIL_FROM || 'fill_the_dotenv_field',
    sendgridEmailTo: process.env.SENDGRID_EMAIL_TO || 'fill_the_dotenv_field',
                                /* apply custom project clientUrl only if
                                    ALL .env fields are filled,
                                    otherwise use a default clientUrl */
    clientUrl:
        process.env.PROJECT_PROTOCOL &&
        process.env.PROJECT_IP &&
        process.env.PROJECT_PORT
        ?
            process.env.PROJECT_PROTOCOL +
            process.env.PROJECT_IP + ':' +
            process.env.PROJECT_PORT
        : 'http://localhost:3000',
                                /* apply custom db config only if
                                    ALL .env fields are filled,
                                    otherwise use a default mongoUri */
    mongoUri:
        process.env.MONGO_PROTOCOL &&
        process.env.MONGO_IP &&
        process.env.MONGO_PORT &&
        process.env.MONGO_DBNAME
        ?
            process.env.MONGO_PROTOCOL +
            process.env.MONGO_IP + ':' +
            process.env.MONGO_PORT + '/' +
            process.env.MONGO_DBNAME
        :   'mongodb://localhost:27017/mernproject'
};

module.exports = config
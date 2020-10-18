// require('dotenv').config({ path: '../.env' });

const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendPort: process.env.FRONTEND_PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'fill_the_dotenv_field',
    projectIp: process.env.PROJECT_IP || 'localhost',
    projectPort: process.env.PROJECT_PORT || 3000,
    projectProtocol: process.env.PROJECT_PROTOCOL || 'http://',
    projectTitle: process.env.PROJECT_NAME || 'MERN-skeleton4',
                                /* apply custom project clientUrl only if
                                    ALL .env fields are filled,
                                    otherwise use a default clientUrl */
    clientUrl:
        process.env.PROJECT_PROTOCOL &&
        process.env.PROJECT_IP &&
        process.env.FRONTEND_PORT
        ?
            process.env.PROJECT_PROTOCOL +
            process.env.PROJECT_IP + ':' +
            process.env.FRONTEND_PORT
        : 'http://localhost:5000',
                                /* apply custom db config only if
                                    ALL .env fields are filled,
                                    otherwise use a default mongoUri */
    mongoUri:

        process.env.MONGO_DBNAME &&
        process.env.MONGO_USERNAME &&
        process.env.MONGO_PASSWORD
        ?   `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pjass.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
        :   'mongodb://localhost:27017/mernproject'
};


module.exports = config
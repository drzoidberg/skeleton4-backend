require('dotenv').config({ path: '../.env' });

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PROJECT_PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'ultraMegaSecretKey',
    projectTitle: process.env.PROJECT_NAME || 'MERN-skeleton2',
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
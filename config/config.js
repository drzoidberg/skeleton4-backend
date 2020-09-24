require('dotenv').config({ path: '../.env' });

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PROJECT_PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'ultraMegaSecretKey',
    projectTitle: process.env.PROJECT_NAME || 'MERN-skeleton2',
    mongoUri:
        process.env.MONGO_HOST &&
        process.env.IP &&
        process.env.MONGO_PORT &&
        process.env.MONGO_PROJECTNAME
        ?
            process.env.MONGO_HOST +
            process.env.MONGO_IP + ':' +
            process.env.MONGO_PORT + '/' +
            process.env.MONGO_DBNAME
        :   'mongodb://localhost:27017/mernproject'
};

module.exports = config
const convict = require('convict');

const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'env',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port',
    },
    jwtPrivateKey: {
        doc: 'The JWT private key.',
        format: String,
        default: 'secretKey',
        env: 'JWT_PRIVATE_KEY',
        arg: 'jwtPrivateKey',
    },
    mongo: {
        uri: {
            doc: 'The URI of the MongoDB instance.',
            format: String,
            default: 'mongodb://localhost:27017/test',
            env: 'MONGO_URI',
            arg: 'mongo-uri',
        },
    },
});

module.exports = config.getProperties();

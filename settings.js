/**
 * Contains important server settings
 *
 * @file settings.js
 * */

module.exports = {
    /**
     * @var {Object} Stores database related properties
     * */
    db:  {
        host:    process.env.dbHost || 'mongodb://localhost:27017',
        options: {
            dbName: process.env.dbName || 'movies_api'
        }
    },
    /**
     * @var {Object} Stores API related properties such as API keys
     * */
    api: {
        omdba: process.env.omdbApiKey || 'XYZ'
    }
};

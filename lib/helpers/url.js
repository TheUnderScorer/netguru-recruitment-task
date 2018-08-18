const QueryString = require( 'querystring' );

module.exports = {

    /**
     * Builds url query
     *
     * @param {String} url
     * @param {Object} data Query data
     *
     * @return String
     * */
    buildQuery( url, data = {} ) {

        const Params = QueryString.stringify( data );

        return `${url}?${Params}`;
    }

};


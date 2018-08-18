/**
 * Helper class for Ombdba API
 *
 * @author Przemysław Żydek
 * */
const Settings   = require( '../../settings' ),
      Axios      = require( 'axios' ),
      BuildQuery = require( '../helpers/url' ).buildQuery;

class Omdba {

    /**
     * @param {Object} params
     *
     * @return String
     * */
    static buildUrl( params = {} ) {

        params.apikey = this.apiKey;

        return BuildQuery( this.url, params );

    }

    /**
     * @param {String} title
     *
     * @return {Promise}
     * */
    static async getMovieByTitle( title ) {

        const Url   = this.buildUrl( { t: title } ),
              Movie = await Axios( Url );

        return Movie.status === 200 ? Movie.data : false;

    }

}

/**
 * @var {String}
 * */
Omdba.apiKey = Settings.api.omdba;

/**
 * @var {String}
 * */
Omdba.url = 'http://www.omdbapi.com/';

module.exports = Omdba;

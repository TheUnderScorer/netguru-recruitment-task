/**
 * Helper class for Ombdba API
 *
 * @author Przemysław Żydek
 * */
const Settings   = require( '../../settings' ),
      Axios      = require( 'axios' ),
      BuildQuery = require( '../helpers/url' ).buildQuery;

class Omdb {

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
     * @param {String} t
     *
     * @return {Promise}
     * */
    static async getMovieByTitle( t ) {

        try {

            const Url   = this.buildUrl( { t } ),
                  Movie = await Axios( Url );

            return Movie.status === 200 ? Movie.data : false;

        } catch ( e ) {

            console.error( e.message );

            return false;

        }

    }

}

/**
 * @var {String}
 * */
Omdb.apiKey = Settings.api.omdb;

/**
 * @var {String}
 * */
Omdb.url = 'http://www.omdbapi.com/';

module.exports = Omdb;

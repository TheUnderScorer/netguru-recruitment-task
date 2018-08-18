/**
 * @file Contains all server routes
 *
 * @author Przemysław Żydek
 * */

const App = require( '../app' );

//Handles adding new movies into database
App.post( '/movies', require( './controllers/add-movie' ) );

//Handles fetching movies from database
App.get( '/movies', require( './controllers/get-movies' ) );

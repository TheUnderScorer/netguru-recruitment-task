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

//Handles adding new comment to movie
App.post( '/comments', require( './controllers/add-comment' ) );

//Handles fetching comments
App.get( '/comments', require( './controllers/get-comments' ) );

//Handle all remaining endpoints
App.get( '*', require( './controllers/invalid-endpoint' ) );

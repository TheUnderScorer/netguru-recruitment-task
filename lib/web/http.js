/**
 * @file Creates HTTP server
 *
 * @author Przemysław Żydek
 * */

const App  = require( '../app' ),
      Http = require( 'http' ).Server( App ),
      Port = process.env.PORT || 5000;

Http.listen( Port, () => console.log( `Server started on port ${Port}` ) );

module.exports = Http;

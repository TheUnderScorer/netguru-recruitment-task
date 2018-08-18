/**
 * @file Sends CORS headers
 *
 * @author Przemysław Żydek
 * */

const App = require( '../../app' );

App.use( ( req, res, next ) => {

    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );

    next();

} );

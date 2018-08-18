/**
 * @file Sets up body-parser middleware to handle POST requests
 *
 * @author Przemysław Żydek
 * */

const App        = require( '../../app' ),
	  BodyParser = require( 'body-parser' );

//Parse application/x-www-form-urlencoded
App.use( BodyParser.urlencoded( { extended: false } ) );

//Parse application/json
App.use( BodyParser.json() );

/**
 * @file Main file. Loads necessary files
 *
 * @author Przemysław Żydek
 * */

//Load app
require( './lib/app' );

//Load middleware
require( './lib/web/middleware' );

//Create connection with mongo database
require( './lib/db/connection' );

//Load HTTP server
require( './lib/web/http' );

//Load routes
require( './lib/web/routes' );


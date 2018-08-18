/**
 * @file Loads middleware modules
 *
 * @author Przemysław Żydek
 * */

//Body parser
require( './middleware/body-parser' );

//CORS
require( './middleware/cors' );

//Sets json header for response
require( './middleware/json-header' );

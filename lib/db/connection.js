/**
 * @file Creates database connection
 *
 * @author Przemysław Żydek
 *
 * */

const Mongoose = require( 'mongoose' ),
      Settings = require( '../../settings' ),
      DbHost   = process.env.dbHost || Settings.db.host;

Mongoose.connect( DbHost, Settings.db.options )
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( e => {
        console.error( e );

        process.exit();
    } );

//Load collections
require( './collections' );

module.exports = Mongoose.connection;

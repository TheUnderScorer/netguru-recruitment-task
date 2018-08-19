/**
 * @file Creates database connection
 *
 * @author Przemysław Żydek
 *
 * */

const Mongoose = require( 'mongoose' ),
      Settings = require( '../../settings' );

Mongoose.connect( Settings.db.host, Settings.db.options )
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( e => {
        console.error( e.message );

        process.exit();
    } );

//Load collections
require( './collections' );

module.exports = Mongoose.connection;

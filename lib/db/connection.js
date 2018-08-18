/**
 * @file Creates database connection
 *
 * @author Przemysław Żydek
 *
 * */

const Mongoose = require( 'mongoose' ),
      Settings = require( '../../settings' );

Mongoose.connect( Settings.db.host, Settings.db.options ).then( () => console.log( 'Connected to MongoDB' ) );

require( './collections' );

module.exports = Mongoose.connection;

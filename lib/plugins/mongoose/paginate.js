const Mongoose = require( 'mongoose' );

/**
 * Paginate using object properties
 *
 * @param {Number} page Currently displayed page
 * @param {Number} limit Limits how many records are displayed per page
 * */
module.exports = function( { page = 1, limit = 10 } ) {

    if ( !page || !limit ) {
        return this;
    }

    let skip = 0;

    limit = parseInt( limit );
    page = parseInt( page );

    if ( page > 1 ) {
        skip = limit * (page - 1);
    }

    return this.limit( limit ).skip( skip );

};

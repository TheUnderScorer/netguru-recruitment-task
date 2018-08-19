/**
 * @file Handles GET /comments endpoint
 *
 * @author Przemysław Żydek
 * */

const Model         = require( 'mongoose' ).model( 'Comment' ),
      ErrorResponse = require( '../responses/error' );

module.exports = async ( req, res ) => {

    let comments = Model.find();

    //Filter by movie ID
    if ( req.query.movieID ) {
        comments.find( { movieID: req.query.movieID } );
    }

    comments.paginate( req.query );

    try {
        comments = await comments.exec();

    } catch ( e ) {

        ErrorResponse.message = 'Invalid parameters';

        return res.status( 400 ).json( ErrorResponse );

    }

    if ( !comments.length ) {

        ErrorResponse.message = 'No comments found';

        return res.status( 404 ).json( ErrorResponse );

    }

    return res.json( comments );

};

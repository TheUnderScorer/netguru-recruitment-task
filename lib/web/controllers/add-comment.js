/**
 * @file Handles POST /comments endpoint
 *
 * @author Przemysław Żydek
 * */

const ErrorResponse = require( '../responses/error' ),
      Mongoose      = require( 'mongoose' ),
      MovieModel    = Mongoose.model( 'Movie' ),
      CommentModel  = Mongoose.model( 'Comment' );


module.exports = async ( req, res ) => {

    if ( !req.body.movieID ) {

        ErrorResponse.message = 'No movieID provided';

        return res.status( 400 ).json( ErrorResponse );

    }

    if ( !req.body.content ) {

        ErrorResponse.message = 'No comment content provided';

        return res.status( 400 ).json( ErrorResponse );

    }

    try {

        //Check if provided movie exists, just in case
        if ( !await MovieModel.findById( req.body.movieID ) ) {

            ErrorResponse.message = 'No associated movie found';

            return res.status( 404 ).json( ErrorResponse );

        }

        const Comment = await new CommentModel( req.body ).save();

        return res.status( 201 ).json( Comment );

    } catch ( e ) {

        ErrorResponse.message = 'Invalid parameters';

        return res.status( 400 ).json( ErrorResponse );

    }

};

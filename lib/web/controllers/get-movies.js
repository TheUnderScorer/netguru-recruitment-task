/**
 * @file Handles GET /movies endpoint
 *
 * @author Przemysław Żydek
 * */

const Model         = require( 'mongoose' ).model( 'Movie' ),
      ErrorResponse = require( '../responses/error' );

module.exports = async ( req, res ) => {

    try {

        const Movies = await Model
            .find()
            //Filter by query params
            .filterByObject( req.query )
            //Sort by query params
            .objectSort( req.query )
            //Paginate results
            .paginate( req.query )
            .exec();

        if ( !Movies.length ) {
            ErrorResponse.message = 'No movies found';

            return res.status( 404 ).json( ErrorResponse );
        }

        return res.json( Movies );

    } catch ( e ) {

        console.error( e );

        ErrorResponse.message = 'Invalid query parameter';
        
        return res.status( 400 ).json( ErrorResponse );

    }

};

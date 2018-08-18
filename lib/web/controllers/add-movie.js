/**
 * @file Handles POST /movies endpoint
 *
 * @author Przemysław Żydek
 * */

const Omdba = require( '../../api/Omdba' ),
      ErrorResponse = require( '../responses/error' );
      Model = require( 'mongoose' ).model( 'Movie' );

module.exports = async ( req, res ) => {

    //Check if movie title is present in request
    if ( !req.body.title ) {

        ErrorResponse.message = 'No movie title provided';

        //No title provided, send error response
        return res.status( 400 ).json( ErrorResponse );
    }

    //Get movie from Omdba API
    const Movie = await Omdba.getMovieByTitle( req.body.title );

    //Movie not found, send response with 404 status
    if ( Movie.Response === 'False' ) {
        return res.status( 404 ).json( Movie );
    }

    //Check if the movie is already in database, if not - insert it
    if ( !await Model.findOne( { Title: Movie.Title } ) ) {

        const MovieModel = new Model( Movie );

        MovieModel.save();

    }

    return res.json( Movie );

};

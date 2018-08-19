/**
 * @file Handles POST /movies endpoint
 *
 * @author Przemysław Żydek
 * */

const Omdba         = require( '../../api/Omdba' ),
      ErrorResponse = require( '../responses/error' ),
      Model         = require( 'mongoose' ).model( 'Movie' );

module.exports = async ( req, res ) => {

    //Check if movie title is present in request
    if ( !req.body.Title ) {

        ErrorResponse.message = 'No movie title provided';

        //No title provided, send error response
        return res.status( 400 ).json( ErrorResponse );

    }

    //Get movie from Omdba API
    const MovieFromApi = await Omdba.getMovieByTitle( req.body.Title );

    //Movie not found, send response with 404 status
    if ( !MovieFromApi || MovieFromApi.Response === 'False' ) {

        ErrorResponse.message = 'Movie not found';

        return res.status( 404 ).json( ErrorResponse );

    }

    let movieFromDb = await Model.findOne( { Title: MovieFromApi.Title } );

    //Check if the movie is already in database, if not - insert it
    if ( !movieFromDb ) {

        //Sometimes api gives us year in weird format (for example Matrix has year as 1993–) so we force the value to be an integer
        MovieFromApi.Year = parseInt( MovieFromApi.Year );

        const MovieModel = new Model( MovieFromApi );

        try {
            movieFromDb = await MovieModel.save();
        } catch ( e ) {

            console.error( e.message );

            ErrorResponse.message = 'Error while saving movie';

            return res.status( 500 ).json( ErrorResponse );

        }

        res.status( 201 );

    }

    //Add API response to our response
    movieFromDb = movieFromDb.toObject();
    movieFromDb.omdbResponse = MovieFromApi;

    return res.json( movieFromDb );

};

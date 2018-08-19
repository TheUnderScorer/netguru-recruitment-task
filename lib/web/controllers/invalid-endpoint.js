/**
 * @file Handles GET / requests
 *
 * @author Przemysław Żydek
 * */

module.exports = ( req, res ) => {

    return res.status( 400 ).json( {
        message: 'This endpoint doesn\'t do anything. You can use /movies and /comments instead'
    } );

};

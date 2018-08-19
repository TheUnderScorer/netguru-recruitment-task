/**
 * @file Creates Movies model
 *
 * @author Przemysław Żydek
 * */


const Mongoose     = require( 'mongoose' ),
      MoviesSchema = new Mongoose.Schema( {
          Title:      String,
          Year:       String,
          Rated:      String,
          Relased:    String,
          Runtime:    String,
          Genre:      String,
          Writer:     String,
          Actors:     String,
          Plot:       String,
          Language:   String,
          Country:    String,
          Awards:     String,
          Poster:     String,
          Ratings:    Array,
          Metascore:  String,
          imdbRating: String,
          imdbVotes:  String,
          imdbID:     String,
          Type:       String,
          DVD:        String,
          BoxOffice:  String,
          Production: String,
          Website:    String,
      } );

/**
 * Performs sorting based on provided object properties
 *
 * @param {String} orderBy Column to order by
 * @param {String} Type of orderding (ASC, DESC)
 *
 * */
MoviesSchema.query.objectSort = function( { orderBy = 'Title', order = 'ASC' } ) {

    return this.sort( {
        [ orderBy ]: order === 'ASC' ? 1 : -1,
    } );

};

/**
 * Perform filtering based on object params
 *
 * @param {Array|String} columns Columns to filter by (can be multiple separated by comma)
 * @param {Array|String} values Value to filter by (if there are more than on columns values index must match columns index)
 *
 * */
MoviesSchema.query.filterByObject = function( { columns, values } ) {

    if ( !columns || !values ) {
        return this;
    }

    const Options    = {},
          forceArray = item => Array.isArray( item ) ? item : item.split( ',' );

    columns = forceArray( columns );
    values = forceArray( values );

    for ( let i = 0; columns.length > i; i++ ) {

        const Column     = columns[ i ],
              //Check if provided columns exists in collection schema
              SchemaPath = this.schema.path( Column );

        if ( SchemaPath ) {
            const Value = values[ i ];

            //Use regex search for string type columns
            Options[ Column ] = SchemaPath.instance === 'String' ? new RegExp( Value ) : Value;
        }

    }

    return this.find( Options );

};

//Implement pagination
MoviesSchema.query.paginate = require( '../../plugins/mongoose/paginate' );

Mongoose.model( 'Movie', MoviesSchema );

/**
 * @file Creates comments model
 *
 * @author Przemysław Żydek
 * */


const Mongoose      = require( 'mongoose' ),
      CommentSchema = new Mongoose.Schema( {
          movieID: {
              type:     Mongoose.Schema.Types.ObjectId,
              trim:     true,
              required: true,
              ref:      'Movie',
          },
          content: {
              type:     String,
              trim:     true,
              required: true,
          }
      } );

//Implement pagination
CommentSchema.query.paginate = require( '../../plugins/mongoose/paginate' );

Mongoose.model( 'Comment', CommentSchema );

const chai      = require( 'chai' ),
      expect    = chai.expect,
      supertest = require( 'supertest' ),
      api       = supertest( 'http://localhost:5000' );

describe( 'GET /comments', () => {

    it( 'Fetch comments', () => {
        api
            .get( '/comments' )
            .set( 'Accept', 'application/json' )
            .expect( 200 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'array' );
                expect( body[ 0 ] ).to.have.all.keys( '_id', 'movieID', 'content', '__v' );


            } );
    } );

    it( 'Fetch comments with invalid movie ID format', () => {
        
        api
            .get( '/comments?movieID=invalid' )
            .set( 'Accept', 'application/json' )
            .expect( 400 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body.error ).to.be.true;
                expect( body ).to.have.all.keys( 'error', 'message' );

            } );

    } );

} );

describe( 'POST /comments', () => {

    it( 'Add new comment', () => {

        api
            .post( '/comments' )
            .set( 'Accept', 'application/json' )
            .send( {
                movieID: '5b789dcd08a8dd03644e7486',
                content: 'Really cool movie!!!',
            } )
            .expect( 'Content-Type', /json/ )
            .expect( 201 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body ).to.have.all.keys( '_id', 'movieID', 'content', '__v' );

            } );

    } );

    it( 'Add comment with invalid format of movie ID', () => {


        api
            .post( '/comments' )
            .set( 'Accept', 'application/json' )
            .send( {
                movieID: '5b789dcd08a8dd03644e7486ee3535',
                content: 'Really cool movie!!!',
            } )
            .expect( 'Content-Type', /json/ )
            .expect( 400 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body ).to.have.all.keys( 'error', 'message' );
                expect( body.error ).to.be.true;

            } );

    } );

    it( 'Add comment with invalid movie ID', () => {


        api
            .post( '/comments' )
            .set( 'Accept', 'application/json' )
            .send( {
                movieID: '5b7863f1cdbb581ac8ffe569',
                content: 'Really cool movie!!!',
            } )
            .expect( 'Content-Type', /json/ )
            .expect( 404 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body ).to.have.all.keys( 'error', 'message' );
                expect( body.error ).to.be.true;

            } );

    } );

} );

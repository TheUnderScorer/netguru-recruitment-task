const chai      = require( 'chai' ),
      expect    = chai.expect,
      supertest = require( 'supertest' ),
      api       = supertest( 'http://localhost:5000' );

describe( 'GET /movies', () => {

    it( 'Fetch movies', () => {

        return api

            .get( '/movies' )
            .set( 'Accept', 'application/json' )
            .expect( 200 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'array' );
                expect( body[ 0 ] ).to.have.property( 'Title' );
                expect( body ).to.have.lengthOf( 10 );


            } );

    } );

    it( 'Fetch movies ordered by year', () => {

        return api
            .get( '/movies?order=ASC&orderBy=Year' )
            .set( 'Accept', 'application/json' )
            .expect( 200 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'array' );
                expect( body[ 0 ].Year ).to.equal( 1966 );

            } );

    } );

    it( 'Fetch movies with invalid column value', () => {

        return api
            .get( '/movies?columns=Year&values=Invalid' )
            .set( 'Accept', 'application/json' )
            .expect( 400 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body ).to.have.all.keys( 'error', 'message' );
                expect( body.error ).to.be.true;

            } );

    } );

    it( 'No fetch results', () => {

        return api
            .get( '/movies?columns=Year&values=9999' )
            .set( 'Accept', 'application/json' )
            .expect( 404 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body ).to.have.all.keys( 'error', 'message' );
                expect( body.error ).to.be.true;

            } );

    } );


} );

describe( 'POST /movies', () => {

    it( 'Add new movie', () => {

        api
            .post( '/movies' )
            .set( 'Accept', 'application/json' )
            .send( {
                title: 'Harry potter'
            } )
            .expect( 'Content-Type', /json/ )
            .expect( 200 )
            .then( res => {

                const body = res.body;

                expect( body ).to.be.a( 'object' );
                expect( body ).to.have.property( 'Title' );
                expect( body ).to.have.all.keys(
                    'Ratings',
                    '_id',
                    'Title',
                    'Year',
                    'Rated',
                    'Runtime',
                    'Genre',
                    'Writer',
                    'Actors',
                    'Plot',
                    'Language',
                    'Country',
                    'Awards',
                    'Poster',
                    'Metascore',
                    'imdbRating',
                    'imdbVotes',
                    'imdbID',
                    'Type',
                    'DVD',
                    'BoxOffice',
                    'Production',
                    'Website',
                    '__v'
                );

            } );

    } );

    it( 'Try to add movie with invalid title', () => {

        api
            .post( '/movies' )
            .set( 'Accept', 'application/json' )
            .send( {
                title: 'sgswtgsgsg'
            } )
            .expect( 'Content-Type', /json/ )
            .expect( 404 )
            .then( res => {

                const body = res.body;

                expect( body ).to.have.all.keys( 'error', 'message' );
                expect( body.error ).to.be.true;

            } );

    } );

} );

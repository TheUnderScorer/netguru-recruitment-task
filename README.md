# netguru-recruitment-task

This is simple REST API that interacts with external API (OMDb) build using Node.js and MongoDB for netguru as recruitment task ;).


# Requirements

- Node.js and npm
- MongoDB

# Installation
- Clone the repo: ```git clone https://github.com/TheUnderScorer/netguru-recruitment-task```
- Install dependencies: `npm install`
- Setup settings.js with your database credentials and OMDb API key
  ```javascript
  module.exports = {
      /**
       * @var {Object} Stores database related properties
       * */
      db:  {
          //Replace with your database url
          host:    process.env.dbHost || 'mongodb://localhost:27017',
          options: {
              //Replace with your database/collection name
              dbName: process.env.dbName || 'movies_api'
          }
      },
      /**
       * @var {Object} Stores API related properties such as API keys
       * */
      api: {
          //Replace with your API key. You can get it here: http://www.omdbapi.com/apikey.aspx
          omdb: process.env.omdbApiKey || 'XYZ'
      }
  };
  ```
- `node index.js` and you are done! :)

# Endpoints

- POST /movies

  Request body should contain only one element `Title`. On success, movie will be saved into application database and you will be presented with object that will contain all movie details . On error you will be presented with [error response](#responses).

- GET /movies

  If no query parameters are provided it will simply fetch all movies from the database (10 movies per page by default). This endpoint supports following query parameters:

  | Query parameter  | Description |
  | ------------- | ------------- |
  | page  | Describes currently displayed page. Default value is `1`.  |
  | limit  | Decides how many movies will be displayed per page. Default value is `10`.  |
  | columns | Columns to filter by. You can provide more than one column name by separating each one with comma. For example `Title, Year`. Note that all column names must be capitalized. | 
  | values | Values for filtering. You can provide more than one value by separathing each one with comma, however please note that value index must match target column index. For example `Interstellar, 2014`. |
  | orderBy | Name of column that will be used to sort movies. Default value is `Title`. Note that all column names must be capitalized. |
  | order | Order of sorting. Available values are `DESC` and `ASC`. Default value is `ASC` |

  Example query string `/movies?orderBy=Year&order=DESC&columns=Year&values=2014`. 
  
  It will fetch all movies that were made in 2014, displayed in descending order based on year.

- POST /comments

  Request body must contain two parameters: `movieID` and `content`. On success it will return object with your freshly created comment, on error you will be presented with [error response](#responses).
  
- GET /comments

  If no query parameters are provided it will fetch all comments from database. This endpoint supports following query parameters:
  
  | Query parameter  | Description |
  | ------------- | ------------- |
  | page  | Describes currently displayed page. Default value is `1`.  |
  | limit  | Decides how many movies will be displayed per page. Default value is `10`.  |
  | movieID  | If provided it will fetch all movies associated with this movie ID.  |
  
   Example query string `/comments?movieID=5b78643989f11114a411e1c3`.
   
   It will fetch all comments for movie with ID `5b78643989f11114a411e1c3`.
  
   # Responses
   
- Error response
  ```javascript
   {
     error:   true,
     message: ''
   };
    ```   
  For now it's the only type of response that you will receive if something will go wrong. The message property will contain information about the error.

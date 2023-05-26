# Assessment Backend - Market Price Aggregation

## Instructions for testing

   1. Create .env and .env.test files besides the .env.example and .env.test.example files, and configure them as needed. *NB: data in test db tables is deleted each time `npm  test` is run, so you may want the test db to be different from the development db.*

   2. Use `npm run reset-db` to reset the database, and populate its first collection with data from the CSV sample file.

   3. use `npm start` to run application

   4. use `npm test` to run the integration tests of the application.

   5. use `docker-compose build` and `docker-compose up` to run app on Docker, and access it at http://localhost:4500. The database inside docker will already contain the data in the sample csv file.
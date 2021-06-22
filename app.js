const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();


app.use('/graphql',graphqlHTTP({}));//GraphQL middleware requires options.

const PORT = 4014;
app.listen(PORT, () => {
    console.log('server is up and runninggg')
})
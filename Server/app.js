const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/schema')
const graphiql = require('graphql')
const app = express();
const cors = require('cors')

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql
}));//GraphQL middleware requires options.


const PORT = 4014;
app.listen(PORT, () => {
    console.log('server is up and runninggg')
})
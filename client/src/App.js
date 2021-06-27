import React from 'react'
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client'
import BookList from './component/BookList'

const client = new ApolloClient({
  uri: "http://localhost:4014/graphql",
    cache: new InMemoryCache()
})

function App() {
  return (

  <div id="main">
      <h1>Ninja's Reading List</h1>
      <ApolloProvider client={client}>
        <BookList/>
      </ApolloProvider>,
  </div>
  );
}

export default App;















import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Header from '../src/components/Header/Header';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />} />
            <Route
              path="/timeline/:timelineId"
              element={<Timeline />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

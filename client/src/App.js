import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Dashboard from './pages/Dashboard';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';


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
            <Route
              path="/dashboard/:userId"
              element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;

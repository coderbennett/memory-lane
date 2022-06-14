import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Dashboard from './pages/Dashboard';
import Header from '../src/components/Header/Header';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
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
          <ToastContainer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React, { useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

  let tempConfirm = false;

  localStorage.getItem('cookieConfirm') ? tempConfirm = true : tempConfirm = false;

  useEffect(() => {
    if (!tempConfirm) {
      toast(<CookiesToast />, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  })

  const CookiesToast = () => {
    return (
      <>
        <h2>This site uses cookies in order to function the user authentication process. By accepting, you consent to the use of cookies. We do no sell your data.</h2>
        <div className="flex justify-around mt-4"><button class="btn btn-primary" onClick={() => { localStorage.setItem("cookieConfirm", true) }}>Ok!</button>
          <a role="button" class="btn btn-secondary" href="https://www.google.com/">No, get me out of here!</a></div>
      </>
    );
  };

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

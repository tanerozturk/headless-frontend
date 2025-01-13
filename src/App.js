// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TourPage from './pages/TourPage';
import TourList from './components/TourList';
import Navbar from './components/Navbar';
import Locations from './pages/Locations';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<TourList />} />
          <Route path="/page/:page" element={<TourList />} />
          <Route path="/tour/:slug" element={<TourPage />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Router>
    </ApolloProvider>


  );
}

export default App;

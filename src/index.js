import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './styles/styles.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";


// Get the root element
const container = document.getElementById('root');

// Create a root and render your app
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

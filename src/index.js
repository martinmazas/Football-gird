import React from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/app' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
)

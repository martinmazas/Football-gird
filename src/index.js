import React from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';

createRoot(
  document.getElementById('root')
).render(
  <Router>
    <Routes>
      <Route exact path='/' Component={HomePage} />
      <Route exact path='/app' Component={App} />
    </Routes>
  </Router>
)

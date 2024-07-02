import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPlayer from './addPlayer';

createRoot(
  document.getElementById('root')
).render(
  <>
    <Router>
      <Routes>
        <Route exact path='/' Component={App} />
        <Route path='/addPlayer' Component={AddPlayer} />
      </Routes>
    </Router>
  </>
)

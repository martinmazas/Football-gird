import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPlayer from './addPlayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route exact path='/' Component={App} />
        <Route path='/addPlayer' Component={AddPlayer} />
      </Routes>
    </Router>
  </>
);

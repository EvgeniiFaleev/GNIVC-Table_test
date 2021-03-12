import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Routes} from './Routes';

function App() {
  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;

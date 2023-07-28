import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={} />
        <Route path="/addPerson" Component={} />
        <Route path="/carImport" Component={} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

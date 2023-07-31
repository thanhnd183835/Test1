import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./Component/Page/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        {/* <Route path="/login" Component={} />
        <Route path="/carImport" Component={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

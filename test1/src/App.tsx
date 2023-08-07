import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./Component/Page/LoginPage/LoginPage";
import CreateTodolist from "./Component/Page/TodoListPage/CreateTodoList/CreateTodolist";
import ListTodoList from "./Component/Page/TodoListPage/ListTodoList/ListTodoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/todos/create" element={<CreateTodolist />} />
        <Route path="/todos" element={<ListTodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

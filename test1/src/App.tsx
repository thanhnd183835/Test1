import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./Component/Page/LoginPage/LoginPage";
import CreateTodolist from "./Component/Page/TodoListPage/CreateTodoList/CreateTodolist";
import ListTodoList from "./Component/Page/TodoListPage/ListTodoList/ListTodoList";
import TodoListDetail from "./Component/Page/TodoListPage/TodoListDetail/TodoListDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/todos/create" element={<CreateTodolist />} />
        <Route path="/todos" element={<ListTodoList />} />
        <Route path="/todos/:id" element={<TodoListDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

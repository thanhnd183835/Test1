import React, { useState } from "react";
import "./ListTodoList.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const ListTodoList = () => {
  const navigate = useNavigate();
  const handleAddTodoList = () => {
    navigate("/todos/create");
  };
  return (
    <div>
      <div>
        <h1>Danh sách todo list</h1>
      </div>
      <div className="list-todo">
        <div className="add-todo">
          <button onClick={handleAddTodoList}>Thêm todo list</button>
        </div>
        <div className="body-todo-list"></div>
      </div>
    </div>
  );
};
export default ListTodoList;

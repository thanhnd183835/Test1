import React, { useState } from "react";
import "./ListTodoList.css";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../../Service/Store";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DnsIcon from "@mui/icons-material/Dns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TodoList } from "../../../../Model/TodolistType";
import { Task } from "../../../../Model/TaskType";

const ListTodoList = () => {
  const navigate = useNavigate();
  const listTodoList = useSelector((state: RootState) => state?.createTodoList);

  const handleAddTodoList = () => {
    navigate("/todos/create");
  };
  const handleDetailTodoList = (dataList: TodoList) => {
    navigate(`/todos/${dataList.id}`, {
      state: {
        dataList: dataList,
      },
    });
  };
  return (
    <div className="body">
      <div>
        <h1>Danh sách todo list</h1>
      </div>
      <div className="">
        {listTodoList &&
          listTodoList.map((itemToDo: TodoList) => {
            return (
              <div
                className="list-todo"
                onClick={() => handleDetailTodoList(itemToDo)}
              >
                <div style={{ display: "flex" }}>
                  <span className="name-todo-list">{itemToDo.name}</span>
                </div>
                <div>
                  {itemToDo.tasks.map((task: Task) => {
                    return (
                      <div className="listTask">
                        <div className="task-name">{task.name}</div>
                        <div className="task-deadline">
                          <CalendarMonthIcon />
                          <div>{task.deadline}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ListTodoList;

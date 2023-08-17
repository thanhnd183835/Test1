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
import EditIcon from "@mui/icons-material/Edit";
import DropdownInfo from "../../../Dropdown/DropdownInfo";
import LockIcon from "@mui/icons-material/Lock";
const ListTodoList = () => {
  const navigate = useNavigate();
  const listTodoList = useSelector((state: RootState) => state?.createTodoList);
  const infoUser = useSelector((state: RootState) => state?.auth);
  const listTodoListOfUser = listTodoList.filter(
    (todoList: TodoList) => todoList.createdBy === infoUser._id
  );
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
  const handleEdit = (dataList: TodoList) => {
    navigate(`/todos/edit/${dataList.id}`, {
      state: {
        dataList: dataList,
      },
    });
  };
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <div style={{ float: "right" }}>
        <div className="infoUser">
          <img
            style={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: 10,
            }}
            src={infoUser.avatar}
          />
          <p>{infoUser.userName}</p>
        </div>
        <div>
          <p className="logout">
            <span>
              <LockIcon />
            </span>
            <span
              style={{ cursor: "pointer", marginLeft: 20 }}
              onClick={handleLogout}
            >
              Đăng xuất
            </span>
          </p>
        </div>
      </div>

      <div>
        <h1>Danh sách todo list</h1>
      </div>
      <div className="button-todolist">
        <button onClick={handleAddTodoList}>Tạo to do list</button>
      </div>
      <div className="">
        {listTodoListOfUser &&
          listTodoListOfUser.map((itemToDo: TodoList) => {
            return (
              <div className="list-todo">
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <span className="name-todo-list">{itemToDo.name}</span>
                  </div>
                  <div className="icon-edit">
                    <EditIcon
                      color="error"
                      onClick={() => handleEdit(itemToDo)}
                    />
                  </div>
                </div>
                <div onClick={() => handleDetailTodoList(itemToDo)}>
                  {itemToDo?.tasks.map((task: Task) => {
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

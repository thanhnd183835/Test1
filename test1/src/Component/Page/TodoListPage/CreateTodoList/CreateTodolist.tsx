import React, { useState } from "react";
import { Task } from "../../../../Model/TaskType";
import "./createTodolist.css";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "../../../../Model/TodolistType";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../../../../Service/Redux/Task/Task.slice";
import { RootState } from "../../../../Service/Store";

const CreateTodolist = () => {
  const dispatch = useDispatch();
  const listTask = useSelector((state: RootState) => state?.createTask);
  const [newTaskName, setNewTaskName] = useState("");
  const [descTask, setDescTask] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [nameToDoList, setNameToDoList] = useState("");
  const [createdAt, setCreatedAt] = useState();
  const [statusTask, setStatusTask] = useState<number>(1);
  const [deadline, setDeadline] = useState<string>();
  const handleAddTodoList = () => {
    const body: TodoList = {
      id: uuidv4(),
      name: newTaskName,
      createdAt: "",
      createdBy: "",
      tasks: [],
    };
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      name: "",
      description: "",
      status: 1,
      deadline: "",
    };
    dispatch(createTask(newTask));
  };
  const handleSaveTask = (task: Task) => {
    const taskData: Task = {
      id: task.id,
      name: newTaskName,
      description: descTask,
      status: statusTask,
      deadline: moment(deadline).format("DD-MM-YYYY"),
    };
    dispatch(updateTask(taskData));
  };
  const handleDeleteTask = (idTask: string) => {
    dispatch(deleteTask(idTask));
  };
  return (
    <div className="add-todo-list">
      <h1>Add Todo List</h1>
      <div className="body-add-list">
        <div className="name-list">
          <label>Tên todo list: </label>
          <input
            onChange={(e) => setNameToDoList(e.target.value)}
            type="text"
          />
        </div>
        <div className="add-task">
          <button onClick={handleAddTask}>Thêm Task</button>
        </div>
        <hr />
        {listTask &&
          listTask.map((task: Task, index: number) => {
            return (
              <div className="content-task">
                <div className="name-task">
                  <label>Tên Task:</label>
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => setNewTaskName(e.target.value)}
                  />
                </div>
                <div className="desc-task">
                  <label>Mô tả:</label>
                  <textarea
                    value={task.description}
                    onChange={(e) => setDescTask(e.target.value)}
                  />
                </div>
                <div className="status-task">
                  <p>
                    Trạng thái:{" "}
                    <span>
                      <select
                        onChange={(e) => {
                          setStatusTask(parseInt(e.target.value));
                        }}
                        value={task.status}
                      >
                        <option value={2} style={{ color: "green" }}>
                          Đã hoàn thành
                        </option>
                        <option value={1} style={{ color: "rgb(247, 230, 5)" }}>
                          Chưa hoàn thành
                        </option>
                        <option value={3} style={{ color: "red" }}>
                          Trễ Deadline
                        </option>
                      </select>
                    </span>
                  </p>
                </div>
                <div className="deadline">
                  <label>Deadline:</label>
                  <input
                    type="date"
                    onChange={(e) => {
                      setDeadline(e.target.value);
                    }}
                  />
                </div>
                <div className="action-task">
                  <button
                    style={{
                      borderRadius: 5,
                      border: "none",
                      backgroundColor: "green",
                      color: "#fff",
                      padding: 10,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSaveTask(task)}
                  >
                    SAVE
                  </button>
                  <button
                    style={{
                      marginLeft: 5,
                      borderRadius: 5,
                      border: "none",
                      backgroundColor: "red",
                      color: "#fff",
                      padding: 10,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    DELETE
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        <div className="button-add-list">
          <button onClick={handleAddTodoList}>Add Todo List</button>
        </div>
      </div>
    </div>
  );
};
export default CreateTodolist;

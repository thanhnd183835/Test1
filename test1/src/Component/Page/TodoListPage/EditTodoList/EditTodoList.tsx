import React, { useState } from "react";
import { Task } from "../../../../Model/TaskType";
import "./EditTodoList.css";
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
import {
  deleteTaskInTodoList,
  updateTodoList,
} from "../../../../Service/Redux/TodoList/Todolist.slice";
import { useNavigate, useLocation } from "react-router-dom";

const EditTodoList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const dataTodoList = location.state.dataList;

  const listTask = useSelector((state: RootState) => state?.createTask);
  const [newTaskName, setNewTaskName] = useState(
    dataTodoList.tasks.map((item: Task) => item.name)
  );
  const [descTask, setDescTask] = useState(
    dataTodoList.tasks.map((item: Task) => item.description)
  );

  const [nameToDoList, setNameToDoList] = useState(dataTodoList.name);
  const [statusTask, setStatusTask] = useState(
    dataTodoList.tasks.map((item: Task) => item.status)
  );
  const [deadline, setDeadline] = useState<string>();
  const [displayedTasks, setDisplayedTasks] = useState(dataTodoList.tasks);
  const [taskData, setTaskData] = useState(dataTodoList.tasks);
  // const [newTaskData, setNewTaskData] = useState<Array<>();
  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedTasks = [...taskData];
    updatedTasks[index][field] =
      field === "status" ? parseInt(value as string, 10) : value;
    setTaskData(updatedTasks);
    // console.log(taskData);
    // console.log(displayedTasks); /// map ra
  };
  console.log(dataTodoList);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  const handleUpdateTodoList = async () => {
    const data: TodoList = {
      id: dataTodoList.id,
      name: nameToDoList,
      createdAt: dataTodoList.createdAt,
      createdBy: dataTodoList.createdBy,
      tasks: taskData,
    };

    const res = await dispatch(updateTodoList(data));

    if (res) {
      alert("Update success");
      navigate("/todos");
    }
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
    dispatch(deleteTaskInTodoList(idTask));
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      name: "",
      description: "",
      status: 1,
      deadline: "",
    };

    setTaskData([...taskData, newTask]);
    dataTodoList.tasks.push(newTask);
  };

  const showUnfinishedTasks = () => {
    const unfinishedTasks = dataTodoList.tasks.filter(
      (task: Task) => task.status === 1
    );
    setDisplayedTasks(unfinishedTasks);
  };
  const complete = () => {
    const unfinishedTasks = dataTodoList.tasks.filter(
      (task: Task) => task.status === 2
    );
    setDisplayedTasks(unfinishedTasks);
  };
  const showLateDeadlineTasks = () => {
    const lateDeadlineTasks = dataTodoList.tasks.filter(
      (task: Task) => task.status === 3
    );
    setDisplayedTasks(lateDeadlineTasks);
  };

  return (
    <div className="add-todo-list">
      <h1>Edit Todo List</h1>
      <div
        style={{ textAlign: "center", marginBottom: 20 }}
        className="filter-button"
      >
        <button onClick={showUnfinishedTasks}>Chưa Hoàn Thành</button>
        <button onClick={complete}>Hoàn Thành</button>
        <button onClick={showLateDeadlineTasks}>Trễ Deadline</button>
      </div>
      <div className="body-add-list">
        <div className="name-list">
          <label>Tên todo list: </label>
          <input
            value={nameToDoList}
            onChange={(e) => setNameToDoList(e.target.value)}
            type="text"
          />
        </div>
        <div className="add-task">
          <button onClick={handleAddTask}>Thêm Task</button>
        </div>
        <hr />
        {displayedTasks &&
          displayedTasks.map((task: Task, index: number) => {
            return (
              <div className="content-task">
                {task.status === 2 || task.status === 3 ? (
                  <>
                    <div className="name-task">
                      <label>Tên Task:</label>
                      <input type="text" disabled value={task.name} />
                    </div>
                    <div className="desc-task">
                      <label>Mô tả:</label>
                      <textarea value={task.description} disabled />
                    </div>
                    <div className="status-task">
                      <p>
                        Trạng thái:{" "}
                        <span>
                          <select
                            disabled
                            value={task.status}
                            onChange={(e) => {
                              handleInputChange(
                                index,
                                "status",
                                e.target.value
                              );
                            }}
                          >
                            <option value={2} style={{ color: "green" }}>
                              Đã hoàn thành
                            </option>
                            <option
                              value={1}
                              style={{ color: "rgb(247, 230, 5)" }}
                            >
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
                        disabled
                        value={moment(task.deadline).format("YYYY-MM-DD")}
                      />
                    </div>
                    <div className="action-task">
                      <button
                        style={{
                          borderRadius: 5,
                          border: "none",
                          backgroundColor: "#bbe8a5",
                          color: "#011627",
                          padding: 10,
                          fontSize: 14,
                        }}
                        type="button"
                        disabled
                        onClick={() => handleSaveTask(task)}
                      >
                        SAVE
                      </button>
                      <button
                        style={{
                          marginLeft: 5,
                          borderRadius: 5,
                          border: "none",
                          backgroundColor: "#db7676",
                          color: "#011627",
                          padding: 10,
                          fontSize: 14,
                        }}
                        type="button"
                        disabled
                      >
                        DELETE
                      </button>
                    </div>
                    <hr />
                  </>
                ) : (
                  <>
                    <div className="name-task">
                      <label>Tên Task:</label>
                      <input
                        type="text"
                        value={task.name}
                        onChange={(e) => {
                          handleInputChange(index, "name", e.target.value);
                        }}
                      />
                    </div>
                    <div className="desc-task">
                      <label>Mô tả:</label>
                      <textarea
                        value={task.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="status-task">
                      <p>
                        Trạng thái:{" "}
                        <span>
                          <select
                            value={task.status}
                            onChange={(e) => {
                              handleInputChange(
                                index,
                                "status",
                                e.target.value
                              );
                            }}
                          >
                            <option value={2} style={{ color: "green" }}>
                              Đã hoàn thành
                            </option>
                            <option
                              value={1}
                              style={{ color: "rgb(247, 230, 5)" }}
                            >
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
                        value={moment(task.deadline).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          handleInputChange(index, "deadline", e.target.value);
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
                  </>
                )}
              </div>
            );
          })}
        <div className="button-add-list">
          <button onClick={handleUpdateTodoList}>Update todo list</button>
        </div>
      </div>
    </div>
  );
};
export default EditTodoList;

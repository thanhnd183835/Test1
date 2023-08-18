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
  const idTodo = location.state.dataList.id;
  const listTodoList = useSelector((state: RootState) => state?.createTodoList);
  const dataTodoList = listTodoList.filter(
    (todoList: TodoList) => todoList.id === idTodo
  );

  const listTask = useSelector((state: RootState) => state?.createTask);
  const [newTaskName, setNewTaskName] = useState(
    dataTodoList[0].tasks.map((item: Task) => item.name)
  );

  const [descTask, setDescTask] = useState(
    dataTodoList[0].tasks.map((item: Task) => item.description)
  );

  const [nameToDoList, setNameToDoList] = useState(dataTodoList[0].name);
  const [statusTask, setStatusTask] = useState(
    dataTodoList[0].tasks.map((item: Task) => item.status)
  );
  const [deadline, setDeadline] = useState<string>();
  const [displayedTasks, setDisplayedTasks] = useState(dataTodoList[0].tasks);
  const [taskData, setTaskData] = useState(dataTodoList[0].tasks);
  console.log(taskData);

  const handleInputChange = (
    index: number,
    field: keyof Task,
    value: string
  ) => {
    const updatedTasks = [...taskData];
    console.log(updateTask);

    if (field === "status") {
      updatedTasks[index][field] = parseInt(value as string, 10);
    } else {
      updatedTasks[index][field] = value;
    }
    setTaskData(updatedTasks);
  };

  const handleUpdateTodoList = async () => {
    const data: TodoList = {
      id: dataTodoList[0].id,
      name: nameToDoList,
      createdAt: dataTodoList[0].createdAt,
      createdBy: dataTodoList[0].createdBy,
      tasks: taskData,
    };

    const res = await dispatch(updateTodoList(data));

    if (res) {
      alert("Update success");
      navigate("/todos");
    }
  };

  const handleSaveTask = (task: Task, index: number) => {
    const taskData: Task = {
      id: task.id,
      name: newTaskName[index],
      description: descTask[index],
      status: statusTask[index],
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
    dataTodoList[0].tasks.push(newTask);
  };

  const showUnfinishedTasks = () => {
    const unfinishedTasks = dataTodoList[0].tasks.filter(
      (task: Task) => task.status === 1
    );
    setDisplayedTasks(unfinishedTasks);
  };
  const complete = () => {
    const unfinishedTasks = dataTodoList[0].tasks.filter(
      (task: Task) => task.status === 2
    );
    setDisplayedTasks(unfinishedTasks);
  };
  const showLateDeadlineTasks = () => {
    const lateDeadlineTasks = dataTodoList[0].tasks.filter(
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
                        onClick={() => handleSaveTask(task, index)}
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
                        onClick={() => handleSaveTask(task, index)}
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

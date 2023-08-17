import React, { useState } from "react";
import { Task } from "../../../../Model/TaskType";
import "./TodoListDetail.css";

import { useNavigate, useLocation } from "react-router-dom";

const TodoListDetail = () => {
  const location = useLocation();
  const dataTodoList = location.state.dataList;

  const [displayedTasks, setDisplayedTasks] = useState(dataTodoList.tasks);

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
      <h1>Todo List Detail</h1>
      <div style={{ textAlign: "center", marginBottom: 20 }} className="filter-button">
        <button onClick={showUnfinishedTasks}>Chưa Hoàn Thành</button>
        <button onClick={complete}>Hoàn Thành</button>
        <button onClick={showLateDeadlineTasks}>Trễ Deadline</button>
      </div>
      <div className="body-add-list">
        <div className="name-list">
          <h3 style={{ textAlign: "center", textTransform: "uppercase" }}>
            {dataTodoList.name}
          </h3>
        </div>

        <hr />
        {displayedTasks &&
          displayedTasks.map((task: Task, index: number) => {
            return (
              <div className="content-task">
                <div className="name-task">
                  <p className="label">Tên Task:</p>
                  <p>{task.name}</p>
                </div>
                <div className="desc-task">
                  <p className="label">Mô tả:</p>
                  <span>
                    <p>{task.description}</p>
                  </span>
                </div>
                <div className="status-task">
                  <p className="label">Trạng thái:</p>
                  <p
                    style={{
                      color:
                        task.status === 1
                          ? "yellow"
                          : task.status === 2
                          ? "green"
                          : "red",
                    }}
                  >
                    {task.status === 1
                      ? "Chưa hoàn thành"
                      : task.status === 2
                      ? "Hoàn Thành"
                      : "Trễ Deadline"}
                  </p>
                </div>
                <div className="deadline">
                  <p className="label">Deadline:</p>
                  <p>{task.deadline}</p>
                </div>

                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default TodoListDetail;

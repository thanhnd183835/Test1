import { TodoList } from "./../../../Model/TodolistType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store";
import { cloneDeep } from "lodash";
import { Task } from "../../../Model/TaskType";

const initialState: Array<TodoList> = [];

const todoListSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    createTodoList: (state, action: PayloadAction<TodoList>) => {
      return [...state, action.payload];
    },
    updateTodoList: (state, action: PayloadAction<TodoList>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const update: TodoList = action.payload;
      const todoListIndex: number = currentState.findIndex(
        (task: TodoList) => task.id === update.id
      );
      if (todoListIndex !== -1) {
        currentState[todoListIndex] = update;
      }
      return currentState;
    },
    deleteTaskInTodoList: (state, action: PayloadAction<string>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const idTask: string = action.payload;
      console.log(currentState[0].tasks);

      const newState = currentState[0].tasks.filter(
        (task: Task) => task.id !== idTask
      );
      console.log(newState);
        
      // return newState;
    },
  },
});

export const { createTodoList, updateTodoList, deleteTaskInTodoList } =
  todoListSlice.actions;

export default todoListSlice.reducer;

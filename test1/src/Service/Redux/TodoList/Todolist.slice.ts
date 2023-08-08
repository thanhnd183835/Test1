import { TodoList } from "./../../../Model/TodolistType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store";



const initialState: Array<TodoList> = []

const todoListSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    createTodoList: (state, action: PayloadAction<TodoList>) => {
      return [...state, action.payload];
    },
  },
});

export const { createTodoList } = todoListSlice.actions;

export default todoListSlice.reducer;

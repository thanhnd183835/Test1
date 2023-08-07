import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store";
import { TodoList } from "../../../Model/TodolistType";

interface TodoListState {
  todoLists: TodoList[];
}

const initialState: TodoListState = {
  todoLists: [],
};

const todoListSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addTodoList: (state, action: PayloadAction<TodoList>) => {
      state.todoLists.push(action.payload);
    },
    // updateTodoListStatus: (
    //   state,
    //   action: PayloadAction<{ id: number; status: TodoList["status"] }>
    // ) => {
    //   const { id, status } = action.payload;
    //   const todoList = state.todoLists.find((list) => list.id === id);
    //   if (todoList) {
    //     // todoList.status = status;
    //   }
    // },
    // deleteTodoList: (state, action: PayloadAction<number>) => {
    //   state.todoLists = state.todoLists.filter(
    //     (list) => list.id !== action.payload
    //   );
    // },
  },
});

export const { addTodoList } = todoListSlice.actions;

export default todoListSlice.reducer;

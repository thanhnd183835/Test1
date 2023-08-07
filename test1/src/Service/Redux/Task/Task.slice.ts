import { Task } from "../../../Model/TaskType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
const initialState: Array<Task> = [];

const CreateTask = createSlice({
  name: "createTask",
  initialState: initialState,
  reducers: {
    createTask: (state, action: PayloadAction<Task>) => {
      return [...state, action.payload];
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const updateTask = action.payload;
      console.log(updateTask);
      const taskUpdateIndex: number = currentState.findIndex(
        (task: Task) => task.id === updateTask.id
      );
      if (taskUpdateIndex !== -1) {
        currentState[taskUpdateIndex] = updateTask;
      }
      return currentState;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const currentState = cloneDeep(JSON.parse(JSON.stringify(state)));
      const idTask: string = action.payload;
      const newTask = currentState.filter((task: Task) => task.id !== idTask);
      return newTask;
    },
  },
});
export const { createTask, updateTask, deleteTask } = CreateTask.actions;

export default CreateTask.reducer;

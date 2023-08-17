import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/login/login.slice";
import createTaskReducer from "./Redux/Task/Task.slice";
import updateTaskReducer from "./Redux/Task/Task.slice";
import deleteTaskReducer from "./Redux/Task/Task.slice";
import deleteAllTaskReducer from "./Redux/Task/Task.slice";
import createTodoListReducer from "./Redux/TodoList/Todolist.slice";
import updateTodoListReducer from "./Redux/TodoList/Todolist.slice";
import deleteTaskInTodoListReducer from "./Redux/TodoList/Todolist.slice";
const rootReducer = combineReducers({
  auth: authReducer,
  createTask: createTaskReducer,
  updateTask: updateTaskReducer,
  deleteTask: deleteTaskReducer,
  deleteAllTask: deleteAllTaskReducer,
  createTodoList: createTodoListReducer,
  updateTodoList: updateTodoListReducer,
  deleteTaskInTodoList: deleteTaskInTodoListReducer,
});
const persistConfig = {
  key: "root",
  storage: storage,
  //   stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;

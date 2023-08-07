import { Task } from "./TaskType";

export type TodoList = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string; // User ID or name of the creator
  tasks: Task[];
};

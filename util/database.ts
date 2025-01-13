import axios from "axios";
import { Task } from "../store/tasks-context";

const DB_URL = process.env.EXPO_PUBLIC_DB_URL;

export const fetchTasks = async (uid: string, token: string) => {
  try {
    const url = `${DB_URL}/tasks/${uid}.json?auth=${token}`;
    const response = await axios.get(url);

    if (response.data) {
      return Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const addTaskToDatabase = async (
  uid: string,
  token: string,
  task: Omit<Task, "id">
) => {
  try {
    const url = `${DB_URL}/tasks/${uid}.json?auth=${token}`;
    const response = await axios.post(url, task);
    return { id: response.data.name, ...task };
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};

export const updateTaskInDatabase = async (
  uid: string,
  token: string,
  taskId: string,
  updatedTask: Partial<Task>
) => {
  try {
    const url = `${DB_URL}/tasks/${uid}/${taskId}.json?auth=${token}`;
    await axios.patch(url, updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

export const removeTaskFromDatabase = async (
  uid: string,
  token: string,
  taskId: string
) => {
  try {
    const url = `${DB_URL}/tasks/${uid}/${taskId}.json?auth=${token}`;
    await axios.delete(url);
  } catch (error) {
    console.error("Error removing task:", error);
    throw new Error("Failed to remove task");
  }
};

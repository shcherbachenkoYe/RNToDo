import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useMemo,
  useContext,
} from "react";
import {
  fetchTasks,
  addTaskToDatabase,
  updateTaskInDatabase,
  removeTaskFromDatabase,
} from "../util/database";
import { AuthContext } from "./auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TasksContextType {
  tasks: Array<Task> | null;
  loadTasks: () => void;
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
}

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TasksContextType>({
  tasks: null,
  loadTasks: () => {},
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
  toggleTaskCompletion: () => {},
});

export const TaskContextProvider: FC<TasksContextProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const { token } = useContext(AuthContext);

  const loadTasks = useCallback(async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId || !token) return;

    const tasksFromDB = await fetchTasks(userId, token);
    setTasks(tasksFromDB);

    console.log("tasks", tasksFromDB);
  }, [token]);

  const addTask = useCallback(
    async (task: Omit<Task, "id">) => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId || !token) return;

      const newTask = await addTaskToDatabase(userId, token, task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [token]
  );

  const editTask = useCallback(
    async (taskId: string, updatedTask: Partial<Task>) => {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId || !token) return;

      await updateTaskInDatabase(userId, token, taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
    },
    [token]
  );

  const removeTask = useCallback(
    async (taskId: string) => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId || !token) return;

      await removeTaskFromDatabase(userId, token, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    },
    [token]
  );

  const toggleTaskCompletion = useCallback(
    async (taskId: string) => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId || !token) return;

      const task = tasks?.find((t) => t.id === taskId);
      if (!task) return;

      const updatedTask = { completed: !task.completed };
      await updateTaskInDatabase(userId, token, taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [tasks, token]
  );

  const value = useMemo(
    () => ({
      tasks,
      loadTasks,
      addTask,
      editTask,
      removeTask,
      toggleTaskCompletion,
    }),
    [tasks, loadTasks, addTask, editTask, removeTask, toggleTaskCompletion]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

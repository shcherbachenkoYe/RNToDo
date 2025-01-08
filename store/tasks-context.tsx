import React, { createContext, useState, ReactNode, FC } from "react";

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TasksContextType {
  tasks: Array<Task> | null;
  loadTasks: (tasks: Array<Task>) => void;
  addTask: (task: Task) => void;
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
  removeTask: () => {},
  editTask: () => {},
  toggleTaskCompletion: () => {},
});

export const TaskContextProvider: FC<TasksContextProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const loadTasks = (tasks: Array<Task>) => {
    setTasks(tasks);
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (taskId: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const value = {
    tasks: tasks,
    loadTasks: loadTasks,
    addTask: addTask,
    editTask: editTask,
    toggleTaskCompletion: toggleTaskCompletion,
    removeTask: removeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import Task from "./Task";
import { TaskContext } from "../../store/tasks-context";

const TaskList: React.FC = () => {
  const { tasks, toggleTaskCompletion, removeTask } = useContext(TaskContext);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Task
          id={item.id}
          name={item.name}
          completed={item.completed}
          onToggleCompletion={toggleTaskCompletion}
          onRemove={removeTask}
        />
      )}
    />
  );
};

export default TaskList;

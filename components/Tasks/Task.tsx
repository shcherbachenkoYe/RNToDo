import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Task as TaskType } from "../../store/tasks-context";

interface TaskProps extends TaskType {
  onToggleCompletion: (id: string) => void;
  onRemove: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  name,
  completed,
  onToggleCompletion,
  onRemove,
}) => {
  const navigation = useNavigation();
  const task = {
    id: id,
    name: name,
    completed: completed,
  } as TaskType;

  return (
    <View style={styles.task}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => onToggleCompletion(id)}
      >
        <Text style={[styles.taskText, completed && styles.completedTask]}>
          {name}
        </Text>
      </TouchableOpacity>
      <Button
        style={{ marginHorizontal: 5 }}
        onPress={() => navigation.replace("ManageTask", { task })}
      >
        Edit
      </Button>
      <Button onPress={() => onRemove(id)}>Remove</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default Task;

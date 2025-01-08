import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../ui/Button";

interface TaskProps {
  id: string;
  name: string;
  completed: boolean;
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
      //TODO: create edit function
      <Button style={{ marginHorizontal: 5 }} onPress={() => {}}>
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

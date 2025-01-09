import { Alert, StyleSheet, Text, View } from "react-native";
import { FC, useId, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Colors } from "../../constants/styles";
import { Task } from "../../store/tasks-context";
import { useNavigation } from "@react-navigation/native";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  isEdit: boolean;
  task?: Task;
}

const TaskForm: FC<TaskFormProps> = ({ onSubmit, onCancel, isEdit, task }) => {
  const [taskValue, setTaskValue] = useState<string>(task?.name || "");
  const navigation = useNavigation();
  const id = useId();

  const onUpdateValueHandler = (enteredValue: string) => {
    setTaskValue(enteredValue);
  };

  const onSubmitHandler = () => {
    if (taskValue) {
      onSubmit({
        id: task?.id || id,
        name: taskValue,
        completed: task?.completed || false,
      });
      navigation.replace("Tasks");
    } else {
      Alert.alert("Empty task", "Please enter your task!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Task</Text>
      <View>
        <Input
          label={"Task"}
          onUpdateValue={onUpdateValueHandler}
          isInvalid={true}
          value={taskValue}
        />
      </View>
      <View style={styles.buttons}>
        <Button onPress={onCancel}>Cancel</Button>
        <Button onPress={onSubmitHandler}>{isEdit ? "Update" : "Add"}</Button>
      </View>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary800,
    marginVertical: 10,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    margin: 8,
  },
});

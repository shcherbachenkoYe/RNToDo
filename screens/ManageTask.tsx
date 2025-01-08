import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import TaskForm from "../components/Tasks/TaskForm";
import { TaskContext } from "../store/tasks-context";

const ManageTask = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);

  const onCancelHandler = () => {
    navigation.replace("Tasks");
  };

  return (
    <View style={styles.rootContainer}>
      <TaskForm onCancel={onCancelHandler} onSubmit={addTask} />
    </View>
  );
};

export default ManageTask;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

import { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import TaskForm from "../components/Tasks/TaskForm";
import { Task, TaskContext } from "../store/tasks-context";

const ManageTask = ({ navigation, route }: { navigation: any; route: any }) => {
  const { addTask, editTask } = useContext(TaskContext);
  const task = route?.params?.task;
  const isEdit = !!task;

  const onCancelHandler = () => {
    navigation.replace("Tasks");
  };

  const onSubmitHandler = (taskData: Omit<Task, "id">) => {
    if (isEdit) {
      editTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    navigation.replace("Tasks");
  };

  return (
    <View style={styles.rootContainer}>
      <TaskForm
        onCancel={onCancelHandler}
        onSubmit={onSubmitHandler}
        isEdit={isEdit}
        task={task}
      />
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

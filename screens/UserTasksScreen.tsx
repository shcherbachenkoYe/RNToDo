import axios from "axios";
import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { TaskContext } from "../store/tasks-context";
import TaskList from "../components/Tasks/TaskList";

const UserTasksScreen = ({ navigation }) => {
  const { tasks, loadTasks } = useContext(TaskContext);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <View style={styles.rootContainer}>
      {!tasks?.length ? (
        <Text style={styles.message}>You don't have any tasks yet</Text>
      ) : (
        <TaskList />
      )}
      <Button
        onPress={() => {
          navigation.replace("ManageTask");
        }}
      >
        Create Task
      </Button>
    </View>
  );
};

export default UserTasksScreen;

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
  message: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 12,
  },
});

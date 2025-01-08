import axios from "axios";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TaskForm from "../components/Tasks/TaskForm";
import Button from "../components/ui/Button";
import { TaskContext } from "../store/tasks-context";
import TaskList from "../components/Tasks/TaskList";

const UserWelcomeScreen = ({ navigation }) => {
  const { tasks } = useContext(TaskContext);

  return (
    <View style={styles.rootContainer}>
      {!tasks?.length ? (
        <Text>You don't have any tasks yet</Text>
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

export default UserWelcomeScreen;

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
